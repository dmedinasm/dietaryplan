import { useState, useEffect } from "react";

export function useLoader () {
    const[cargando, setCargando] = useState(true)

    useEffect(() =>{
        setTimeout(() => {
          setCargando(false);
        }, 8000)
      },[])

    return cargando
}
