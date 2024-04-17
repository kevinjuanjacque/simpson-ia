"use client"

import { createCharacter, getCharacter } from "@/actions/form.character";

import { useFormState } from "react-dom";
import { ContentForm } from "./components/content.input";
import { ShowResult } from "./components/show.result";

export default function HomePage() {
  
  const handleSumbit =async (state:unknown,formdata:FormData)=>{
    
    let character = await createCharacter(formdata);
    console.log(character.id);
    const id = character.id;
    while(character.status !== "succeeded"){
      character = await getCharacter(id);
      console.log(character);
      
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    console.log(character);
    return character
  }
  const [state,formAction]=useFormState(handleSumbit,null)

  return <section>
    {
      state && <ShowResult src={state.output[0]}  />
      }
      <form action={formAction} className="flex flex-col gap-2 p-5">
      <ContentForm />
    </form>
  </section>;
}
