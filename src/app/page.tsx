"use client"

import { createCharacter } from "@/actions/form.character";

import { useFormState } from "react-dom";
import { ContentForm } from "./components/content.input";
import { ShowResult } from "./components/show.result";

export default function HomePage() {
  const [state,formAction]=useFormState(createCharacter,null)

  return <section>
    {state && <ShowResult src={state[0]} />
        }
            <form action={formAction} className="flex flex-col gap-2 p-5">
      <ContentForm />
    </form>
  </section>;
}
