import React, { createContext, useState } from 'react'

export const Context = createContext()
export const Datos = ({children}) =>{
    const[peso, setPeso] = useState(0)
    const[altura,setAltura] = useState(0)
    const[alergic, setAlergic] = useState("")
    const[disease, setDisease] = useState("")
    return(
        
        <Context.Provider value={{peso, setPeso,altura,setAltura,disease,setDisease, alergic, setAlergic}}>
            {children}
        </Context.Provider>
    )

    
}
