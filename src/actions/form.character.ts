"use server"

import Replicate from 'replicate';
const replicate = new Replicate({

});

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET 
});


export async function createCharacter(state:unknown,formData: FormData) {

  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload?upload_preset=ml_default&folder=${process.env.CLOUDINARY_FOLDER}`,
    {
      method: "PUT",
      body: formData.get('image') as File,
    },
  ).then((res) => res.json()).then((res) =>{
    return res.secure_url});
    
    const input = {
      prompt: "A TOK Simpsons character, "+formData.get('props') as string,
      refine: "expert_ensemble_refiner",
      apply_watermark: false,
      negative_prompt: "ugly, broken, distorted, artefacts, 3D, render, photography",
      num_inference_steps: 40,
      image: imageUrl,
      width:800,
      height:800,
    };

    const output:any = await replicate.run("fofr/sdxl-simpsons-characters:f4d36a72b43ea2fd511cab0afb32539955ee5b28b65c8e3fb7d8abd254be8e91", { input });
    console.log({output})
    const urlOutput = output[0];
    cloudinary.uploader.upload(urlOutput as string, {folder: process.env.CLOUDINARY_FOLDER} )

    return output;
}