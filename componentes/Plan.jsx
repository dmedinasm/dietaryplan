import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'

const Plan = () => {
  const {peso} = useContext(Context)
  const {altura} = useContext(Context)
  const [mealsId, setMealsID] = useState([]) 
  const IMC = (peso)/(altura/100)**2

  const planResult = async () => {
    try {
      const response = await fetch('https://api.edamam.com/api/meal-planner/v1/9d99e507/select', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Edamam-Account-User': 'dmedinas',
          'Authorization': 'Basic OWQ5OWU1MDc6IDg1MGE3YmVjYTE4ZGFjNmNiMGMyMThiMDcwNzAzZDg0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "size": 2,
          "plan": {
            "accept": {
              "all": [
                {
                  "health": [
                    "VEGAN"
                  ]
                },
                {
                  "cuisine": [
                    "Mediterranean"
                  ]
                }
              ]
            },
            "fit": {
              "ENERC_KCAL": {
                "min": 1800,
                "max": 2200
              },
              "PROCNT": {
                "min": 50,
                "max": 300
              }
            },
            "sections": {
              "Breakfast": {},
              "Lunch": {
                "exclude": [
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_x",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_y",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_z"
                ],

              },
              "Dinner": {
                "exclude": [
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_a",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_b",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_c"
                ],

              }
            }
          }
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /*fetch("https://api.edamam.com/api/recipes/v2/recipe_ed2c810d10f2885d36a49962322a4719?type=public&app_id=9d99e507&app_key=850a7beca18dac6cb0c218b070703d84", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Edamam-Account-User": "dmedinas",
      "Accept-Language": "en"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));*/
  useEffect(() =>{
    planResult().then(data => {
      console.log(data)

    const mealsRecipeID = data.selection.map(valor => {
      const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
      const lunch = valor.sections.Lunch.assigned.split("#")[1]
      const dinner = valor.sections.Dinner.assigned.split("#")[1]
      return [breakfast, lunch, dinner]
    })
    setMealsID(mealsRecipeID)
  })
  },[])
  
console.log(mealsId)
  return (
    <>
       <div></div>
    </>
  )
}

export default Plan