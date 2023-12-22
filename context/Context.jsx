import React, { createContext, useState } from 'react'

export const Context = createContext()
export const Datos = ({children}) =>{
    const[mealsId, setMealsID] = useState([])
    return(
        
        <Context.Provider value={{mealsId, setMealsID}}>
            {children}
        </Context.Provider>
    )

    
}
