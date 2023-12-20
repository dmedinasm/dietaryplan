import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Meal from './Meal'
import { useNavigate } from 'react-router-dom'

const Plan = () => {
  const {peso} = useContext(Context)
  const {altura} = useContext(Context)
  const [kcal, setKcal] = useState()
  const [kcalBreakfast, setKcalBreakfast] = useState()
  const [kcalLunch, setKcalLunch] = useState()
  const [kcalDinner, setKcalDinner] = useState()
  const [mealsId, setMealsID] = useState([]) 
  const[mealsRendered, setMealsRendered] = useState([])
  const navigation = useNavigate()
  const IMC = (peso)/(altura/100)**2
 
  useEffect(() =>{
    if (IMC < 18.5) {
      setKcal({...kcal,min : 1800, max : 2000})
      setKcalBreakfast({min:540, max:600})
      setKcalLunch({min:720, max:800})
      setKcalDinner({min:360, max:400})
    }else if(IMC >= 18.5 && IMC < 25){
      setKcal({...kcal,min : 1600,max : 1800})
      setKcalBreakfast({min:480, max:540})
      setKcalLunch({min:640, max:720})
      setKcalDinner({min:320, max:360})
    }else if(IMC >= 25 && IMC < 30){
      setKcal({...kcal,min : 1400,max : 1600})
      setKcalBreakfast({min:420, max:480})
      setKcalLunch({min:560, max:640})
      setKcalDinner({min:280, max:320})
    }else if(IMC >= 30 && IMC < 35){
      setKcal({...kcal,min : 1200,max : 1400})
      setKcalBreakfast({min:360, max:420})
      setKcalLunch({min:480, max:560})
      setKcalDinner({min:240, max:280})
    }else if(IMC >= 35 && IMC < 40){
      setKcal({...kcal,min : 1000,max : 1200})
      setKcalBreakfast({min:300, max:360})
      setKcalLunch({min:400, max:480})
      setKcalDinner({min:200, max:240})
    }else{
      setKcal({...kcal,min : 800,max : 1000})
      setKcalBreakfast({min:240, max:300})
      setKcalLunch({min:320, max:400})
      setKcalDinner({min:160, max:200})
    }
  },[])

 console.log(kcal) 
 console.log(kcalBreakfast)
 console.log(kcalLunch)
 console.log(kcalDinner)
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
              "all": [ ]
            },
            "fit": {
              "ENERC_KCAL": kcal
            },
            "sections": {
              "Breakfast": {"fit":{
                "ENERC_KCAL": {
                 kcalBreakfast
                }
              }},
              "Lunch": {
                "fit":{ 
                  "ENERC_KCAL": {
                   kcalLunch
                  }
                },
                  
                "exclude": [
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_x",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_y",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_z"
                ],

              },
              "Dinner": {
                "fit":{ 
                  "ENERC_KCAL": {
                    kcalDinner
                  }
                },
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
       
                <Meal
                  key={valor.recipe.label}
                  title={valor.recipe.label}
                  image={valor.recipe.images.SMALL.url}
                  kcal={Math.floor(valor.recipe.totalNutrients.ENERC_KCAL.quantity)}
                  carb={Math.floor(valor.recipe.totalNutrients.CHOCDF.quantity)}
                  fat={Math.floor(valor.recipe.totalNutrients.FAT.quantity)}
                  protein={Math.floor(valor.recipe.totalNutrients.PROCNT.quantity)}
                />
            )
            }
          </div>
          <div className="btNewPlan">
          <button  onClick={() => navigation("/")} >Get New Diet Plan!</button>
          </div>
          
        </div>}

    </>
  )
}

export default Plan