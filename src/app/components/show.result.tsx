"use client"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";


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
        element.download = "image.png";
        element.click();
      };

      if(src==""){
          return <div>No lo logramos</div>
      }
  return (
    <div className="flex flex-col gap-2  items-center">
        <img className="w-full" src={src} alt="Imagen resultante" />
        
        
        <Button className="w-full max-w-[800px]" onClick={() => download()}>Descargar</Button>
      
        <div className="h-[1px] w-full bg-gray-800 my-5" />

    </div>
  )
}
