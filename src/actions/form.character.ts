"use server"

import { unstable_noStore as noStore } from "next/cache";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET 
});


export async function createCharacter(formData: FormData) {
  noStore();

  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload?upload_preset=ml_default&folder=${process.env.CLOUDINARY_FOLDER}`,
    {
      method: "PUT",
      body: formData.get('image') as File,
    },
  ).then((res) => res.json()).then((res) =>{
    return res.secure_url});
    

    const output = await fetch("https://replicate.com/api/models/fofr/sdxl-simpsons-characters/versions/f4d36a72b43ea2fd511cab0afb32539955ee5b28b65c8e3fb7d8abd254be8e91/predictions", {
      "headers": {
        "accept": "application/json",
        "accept-language": "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/json",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "UVLrcRyCRaotT8xVbMX32NFqKLz12HQh",
        "cookie": "rl_page_init_referrer=RS_ENC_v3_Imh0dHBzOi8vd3d3LmJpbmcuY29tLyI%3D; rl_page_init_referring_domain=RS_ENC_v3_Ind3dy5iaW5nLmNvbSI%3D; rl_session=RS_ENC_v3_eyJpZCI6MTcxMzM1OTkxNDk0OSwiZXhwaXJlc0F0IjoxNzEzMzYxNzE0OTYxLCJ0aW1lb3V0IjoxODAwMDAwLCJzZXNzaW9uU3RhcnQiOnRydWUsImF1dG9UcmFjayI6dHJ1ZX0%3D; replicate_anonymous_id=a748c9d2-9fed-43c3-9e08-d4ae7c343376; csrftoken=UVLrcRyCRaotT8xVbMX32NFqKLz12HQh; sessionid=apjcvlupjdt7eulcds8eircjt0znlji8; rs_ga=GA1.1.a748c9d2-9fed-43c3-9e08-d4ae7c343376; rs_ga_CY22PWXDRL=GS1.1.1713359914949.1.1.1713359937.0.0.0; rl_trait=RudderEncrypt%3AU2FsdGVkX18r5X3ZCcNInDFLSeavJeVFKxX1BoBTp4E%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2FnUfG2hcROzCOopaiEkK0JUVswjIDyDgs%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX18weIFVbKTAP8lA5uoxpYGFI6my6GWMUcQ%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2FWxoD8NxcOEbwYgB2UsxqZcpxsD1OUsecCgHQ0DD8O6YaPBKB4yg0K%2Boxish6FAwSMk%2FG9kEy0BA%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2FtCT5mNEKmHgbCNkcWb%2FB%2BmySh0WBl8BU%3D",
        "Referer": "https://replicate.com/fofr/sdxl-simpsons-characters",
        "Referrer-Policy": "same-origin"
      },
      "body":  JSON.stringify(
        {
          "input": {
            "width": 800,
            "height": 800,
            "prompt": "A TOK Simpsons character, "+formData.get('props') as string,
            "refine": "expert_ensemble_refiner",
            "scheduler": "K_EULER",
            "lora_scale": 0.6,
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "apply_watermark": false,
            "high_noise_frac": 0.8,
            "negative_prompt": "ugly, broken, distorted, artefacts, 3D, render, photography",
            "prompt_strength": 0.8,
            "num_inference_steps": 30,
            "image": imageUrl as string
          },
          "stream": false
        }
      ),
      "method": "POST"
    }).then(response => response.json());
    

    console.log(output)
    
    //cloudinary.uploader.upload(urlOutput as string, {folder: process.env.CLOUDINARY_FOLDER} )

    return output;
}


export async function getCharacter(id: string) {
    noStore();
    
    const prediction = await fetch(`https://replicate.com/api/predictions/${id}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "rl_page_init_referrer=RS_ENC_v3_Imh0dHBzOi8vd3d3LmJpbmcuY29tLyI%3D; rl_page_init_referring_domain=RS_ENC_v3_Ind3dy5iaW5nLmNvbSI%3D; rl_session=RS_ENC_v3_eyJpZCI6MTcxMzM1OTkxNDk0OSwiZXhwaXJlc0F0IjoxNzEzMzYxNzE0OTYxLCJ0aW1lb3V0IjoxODAwMDAwLCJzZXNzaW9uU3RhcnQiOnRydWUsImF1dG9UcmFjayI6dHJ1ZX0%3D; replicate_anonymous_id=a748c9d2-9fed-43c3-9e08-d4ae7c343376; csrftoken=UVLrcRyCRaotT8xVbMX32NFqKLz12HQh; sessionid=apjcvlupjdt7eulcds8eircjt0znlji8; rs_ga=GA1.1.a748c9d2-9fed-43c3-9e08-d4ae7c343376; rs_ga_CY22PWXDRL=GS1.1.1713359914949.1.1.1713359937.0.0.0; rl_trait=RudderEncrypt%3AU2FsdGVkX18r5X3ZCcNInDFLSeavJeVFKxX1BoBTp4E%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2FnUfG2hcROzCOopaiEkK0JUVswjIDyDgs%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX18weIFVbKTAP8lA5uoxpYGFI6my6GWMUcQ%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2FWxoD8NxcOEbwYgB2UsxqZcpxsD1OUsecCgHQ0DD8O6YaPBKB4yg0K%2Boxish6FAwSMk%2FG9kEy0BA%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2FtCT5mNEKmHgbCNkcWb%2FB%2BmySh0WBl8BU%3D",
        "Referer": `https://replicate.com/fofr/sdxl-simpsons-characters?prediction=${id}`,
        "Referrer-Policy": "same-origin"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    }).then(response => response.json())
  .catch((err) => console.log(err));
  return prediction;
}