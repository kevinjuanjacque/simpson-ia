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
    return res.secure_url}).catch(e=>console.log(e));
    

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
        "x-csrftoken": process.env.SRFTOKEN as string,
        "cookie": process.env.COOKIE as string,
        "Referer": "https://replicate.com/fofr/sdxl-simpsons-characters",
        "Referrer-Policy": "same-origin"
      },
      "body":  JSON.stringify(
        {
          "input": {
            "width": 800,
            "height": 800,
            "prompt": "Generate a new character inspired by the style of The Simpsons. Take into account whether the person in the image is a child or an adult when creating the character. The character should have recognizable features from The Simpsons universe, such as the head shape, large and round eyes, and a vibrant color palette typical of the series. Make sure to capture the humorous and caricatured essence that defines The Simpsons characters, good definition, 4k, "+formData.get('props') as string,
            "refine": "expert_ensemble_refiner",
            "scheduler": "K_EULER",
            "lora_scale": 0.6,
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "apply_watermark": false,
            "high_noise_frac": 0.8,
            "negative_prompt": "ugly, broken, distorted, artefacts, 3D, render, photography",
            "prompt_strength": 0.8,
            "num_inference_steps": 50,
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
        "cookie": process.env.COOKIE as string,
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