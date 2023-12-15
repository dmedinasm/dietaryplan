import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Meal from './Meal'

const Plan = () => {
  const {peso} = useContext(Context)
  const {altura} = useContext(Context)
  const [mealsId, setMealsID] = useState([]) 
  const[mealsRendered, setMealsRendered] = useState([])
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
          "size": 7,
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
                "min": 800,
                "max": 1000
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

  const mealsData = async (id) => {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=9d99e507&app_key=850a7beca18dac6cb0c218b070703d84`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Edamam-Account-User": "dmedinas",
          "Accept-Language": "en"
        }
      })
      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    planResult().then(data => {
      console.log(data)

      const mealsRecipeID = data.selection.map(valor => {
        const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
        const lunch = valor.sections.Lunch.assigned.split("#")[1]
        const dinner = valor.sections.Dinner.assigned.split("#")[1]
        return [breakfast, lunch, dinner]
      })
      setMealsID(mealsId => mealsId.concat(...mealsRecipeID))
    })
  }, [])
console.log(mealsId)
  //Array de promesas paraque lleguen en orden
  useEffect(() => {
    Promise.all(mealsId.map(mealsData))
      .then(dataArray => setMealsRendered(dataArray));
  }, [mealsId]);
  
console.log(mealsRendered)
  return (
    <>

      {mealsRendered.length > 0 &&
        <div>
          <h1 className="titlePlan">7 days Diet Plan</h1>
          <div className="containerPlan">
            <div className="labelBr">Breakfast</div>
            <div className="labelLunch">Lunch</div>
            <div className="labelDinner">Dinner</div>
            <div className="iconBr"><img src="./assets/images/tab-icon-02.png" alt="iconBr" /></div>
            <div className="iconLunch"><img src="./assets/images/tab-icon-01.png" alt="iconLunch" /></div>
            <div className="iconDinner"><img src="./assets/images/tab-icon-03.png" alt="iconDinner" /></div>

            {mealsRendered.map((valor, i) =>
              <div className="containerMeal">
                {/*i === 0 || i % 3 === 0
               ?
               <div className="dayPlan">Day { i === 0 ? i+1 : (i / 3) + 1}</div>
               : null
         */}
                <Meal
                  key={valor.recipe.label}
                  title={valor.recipe.label}
                  image={valor.recipe.images.SMALL.url}
                  kcal={Math.floor(valor.recipe.totalNutrients.ENERC_KCAL.quantity)}
                  carb={Math.floor(valor.recipe.totalNutrients.CHOCDF.quantity)}
                  fat={Math.floor(valor.recipe.totalNutrients.FAT.quantity)}
                  protein={Math.floor(valor.recipe.totalNutrients.PROCNT.quantity)}
                />
              </div>
            )
            }
          </div>
        </div>}

    </>
  )
}

export default Plan