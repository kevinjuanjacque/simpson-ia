"use client"
import { Button } from "@/components/ui/button"


export const ShowResult = ({src}:{src:string}) => {
    const download = () => {
        var element = document.createElement("a");
        var file = new Blob(
          [
            src
          ],
          { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
      };
  return (
    <div className="flex flex-col gap-2">
        <img src={src} alt="Imagen resultante" />
        
        
        <Button onClick={() => download()}>Descargar</Button>
      
        <div className="h-[1px] w-full bg-gray-800 my-5" />

    </div>
  )
}
