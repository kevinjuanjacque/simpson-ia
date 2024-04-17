"use client"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";


export const ContentForm = () => {
    const {pending}=useFormStatus()
  return (
    <>
    {pending && <Skeleton className="w-[800px] h-[800px] rounded-sm" />}
    <Input required type="file" alt="foto de perfil" name="image" />
    <Textarea placeholder="Escribe los props, ej: shirt, hair gray and eyes blue, Similar to bart"  name="props"/>
    <Button disabled={pending}>{pending ?"Generando imagen..." :  "Generar imagen"}</Button></>
  )
}
