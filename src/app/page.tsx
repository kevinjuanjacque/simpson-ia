"use client"

import { createCharacter, getCharacter } from "@/actions/form.character";

import { useFormState } from "react-dom";
import { ContentForm } from "./components/content.input";
import { ShowResult } from "./components/show.result";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function HomePage() {
  const [Resultados, setResultados] = useState<string[]>([])
  
  const handleSumbit =async (state:unknown,formdata:FormData)=>{
    
    let character = await createCharacter(formdata);
    const id = character.id;
    while(["starting","processing"].includes(character.status)){
      character = await getCharacter(id);
      console.log(character.id,id)
      setResultados(prev=>[...prev,character.status])
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    return character
  }
  const [state,formAction]=useFormState(handleSumbit,null)

  return <section>
    {
      state && <ShowResult src={state.output[0]}  />
      }
      <form action={formAction} className="flex flex-col gap-2 py-5">
      <ContentForm />
    </form>

    <Table className="table-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Intento</TableHead>
          <TableHead>Result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>example</TableCell>
          <TableCell>expample</TableCell>
        </TableRow>
        {Resultados.map((result, index) => (
        <React.Fragment key={index+result}>
          <TableRow>
          <TableCell>{index}</TableCell>
          <TableCell>{result}</TableCell>
        </TableRow>
        </React.Fragment>))}
      </TableBody>
    </Table>
  </section>;
}
