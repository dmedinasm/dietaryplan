import React, { createContext, useState } from 'react'

export const Context = createContext()
export const Datos = ({children}) =>{
    const[mealsId, setMealsID] = useState([])
    const[dietType, setDietType] = useState([])

    return(
        
        <Context.Provider value={{mealsId, 
        setMealsID, 
        dietType, 
        setDietType,  }}>
            {children}
        </Context.Provider>
    )

    
}
