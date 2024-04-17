"use server"

import { unstable_noStore as noStore } from "next/cache";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET 
});


export async function createCharacter(formData: FormData) {

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
        "accept-language": "es-CL,es-419;q=0.9,es;q=0.8,es-ES;q=0.7,en;q=0.6,en-GB;q=0.5,en-US;q=0.4",
        "content-type": "application/json",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "pRPTjrIZiRSHcFKlQgmtemAmnCKu1241",
        "cookie": "rl_page_init_referrer=RS_ENC_v3_Imh0dHBzOi8vd3d3LmJpbmcuY29tLyI%3D; rl_page_init_referring_domain=RS_ENC_v3_Ind3dy5iaW5nLmNvbSI%3D; rl_session=RS_ENC_v3_eyJpZCI6MTcxMzMyODQzNTY0MSwiZXhwaXJlc0F0IjoxNzEzMzMwMjM1NjUyLCJ0aW1lb3V0IjoxODAwMDAwLCJzZXNzaW9uU3RhcnQiOnRydWUsImF1dG9UcmFjayI6dHJ1ZX0%3D; replicate_anonymous_id=59501afe-ceb5-48f8-ae78-85e42c671b20; rs_ga=GA1.1.59501afe-ceb5-48f8-ae78-85e42c671b20; csrftoken=pRPTjrIZiRSHcFKlQgmtemAmnCKu1241; sessionid=6a96k7zdq9sus784ilzqj8bxwhkzi4sx; rs_ga_CY22PWXDRL=GS1.1.1713338028.3.0.1713338028.0.0.0; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2B8Du%2BN6F2Wmb80K1xXtkKg7J3QR0yErqY%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX19M27GGl2pDQSJoDuezDQPP%2BHSgApFhbb8%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX19Oh6cMLVmcCs61d9oW3zVLu0FYndX6BII%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX19QmUYIBJhUqKV1x5%2Ff6fHQgJwbYnzHp1zzgi7Yr6l7i7lC%2BlM8uYt5X1kxwIMF%2Fv%2BBYeJo%2FdOBXg%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2BXt7EtOkALG5NR9%2BssNDKDYCVmBR8znd4%3D",
        "Referer": "https://replicate.com/fofr/sdxl-simpsons-characters",
        "Referrer-Policy": "same-origin"
      },
      "body": JSON.stringify(
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
    
    console.log(output);

    
    //cloudinary.uploader.upload(urlOutput as string, {folder: process.env.CLOUDINARY_FOLDER} )

    return output;
}


export async function getCharacter(id: string) {
    noStore();

    const prediction = await fetch(`https://replicate.com/api/predictions/${id}`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "es-CL,es-419;q=0.9,es;q=0.8,es-ES;q=0.7,en;q=0.6,en-GB;q=0.5,en-US;q=0.4",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "rl_page_init_referrer=RS_ENC_v3_Imh0dHBzOi8vd3d3LmJpbmcuY29tLyI%3D; rl_page_init_referring_domain=RS_ENC_v3_Ind3dy5iaW5nLmNvbSI%3D; rl_session=RS_ENC_v3_eyJpZCI6MTcxMzMyODQzNTY0MSwiZXhwaXJlc0F0IjoxNzEzMzMwMjM1NjUyLCJ0aW1lb3V0IjoxODAwMDAwLCJzZXNzaW9uU3RhcnQiOnRydWUsImF1dG9UcmFjayI6dHJ1ZX0%3D; replicate_anonymous_id=59501afe-ceb5-48f8-ae78-85e42c671b20; rs_ga=GA1.1.59501afe-ceb5-48f8-ae78-85e42c671b20; csrftoken=pRPTjrIZiRSHcFKlQgmtemAmnCKu1241; sessionid=6a96k7zdq9sus784ilzqj8bxwhkzi4sx; rs_ga_CY22PWXDRL=GS1.1.1713338028.3.0.1713338028.0.0.0; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2B8Du%2BN6F2Wmb80K1xXtkKg7J3QR0yErqY%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX19M27GGl2pDQSJoDuezDQPP%2BHSgApFhbb8%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX19Oh6cMLVmcCs61d9oW3zVLu0FYndX6BII%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX19QmUYIBJhUqKV1x5%2Ff6fHQgJwbYnzHp1zzgi7Yr6l7i7lC%2BlM8uYt5X1kxwIMF%2Fv%2BBYeJo%2FdOBXg%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2BXt7EtOkALG5NR9%2BssNDKDYCVmBR8znd4%3D"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    }).then(response => response.json())
  .catch((err) => console.log(err));
  console.log(prediction,`https://replicate.com/api/predictions/${id}`);
  return prediction;
}