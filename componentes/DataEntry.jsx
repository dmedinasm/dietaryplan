import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import {useNavigate} from 'react-router-dom'
import { dietType, allergies } from '../data/data'
const DataEntry = () => {
const[peso, setPeso] = useState(0)
const[altura, setAltura] = useState(0)
const {setMealsID} =  useContext(Context)
const [checkedIDDiet, setCheckedIDDiet] = useState([])
const [checkedIDAllergies, setCheckedIDAllergies] = useState([])
const [dietHealth, setDietHealth] = useState([])
const[allergiesCare, setAllergiesCare] = useState([])
const navigate = useNavigate()

const planResult = async (calMin, calMax,calMinBreakfast,calMaxBreakfast,calMinLunch,calMaxLunch,calMinDinner,calMaxDinner) => {
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
            "all": [{"diet":dietHealth} ]
          },
          "fit": {
            "ENERC_KCAL": {
              "min": calMin,
              "max": calMax
            }
          },
          "sections": {
            "Breakfast": {
              "accept":{
                "all":[{"meal":["breakfast"]}]

              },
              "fit":{
              "ENERC_KCAL":{
                "min":calMinBreakfast,
                "max":calMaxBreakfast
              }
            }},
            "Lunch": {
              "accept":{
                "all":[{"meal":["lunch/dinner"]}]
              },
              "fit":{ 
                "ENERC_KCAL": {
                  "min":calMinLunch,
                  "max":calMaxLunch
                }
              },
                
              "exclude": [
                "http://www.edamam.com/ontologies/edamam.owl#recipe_x",
                "http://www.edamam.com/ontologies/edamam.owl#recipe_y",
                "http://www.edamam.com/ontologies/edamam.owl#recipe_z"
              ],

            },
            "Dinner": {
              "accept":{
                "all":[{"meal":["lunch/dinner"]}]
              },
              "fit":{ 
                "ENERC_KCAL": {
                  "min":calMinDinner,
                  "max":calMaxDinner
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
const fetchData = async (kcMin,
  kcMax,
  kMinBr,
  kMaxBr,
  kcMinLunch,
  kcMaxLunch,
  kcMinDin,
  kcMaxDin) => {
  try {

      const data = await planResult(kcMin,
        kcMax,
        kMinBr,
        kMaxBr,
        kcMinLunch,
        kcMaxLunch,
        kcMinDin,
        kcMaxDin)
      const mealsRecipeID = data.selection.map(valor => {
      const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
      const lunch = valor.sections.Lunch.assigned.split("#")[1]
      const dinner = valor.sections.Dinner.assigned.split("#")[1]
      return [breakfast, lunch, dinner]
    });
    setMealsID(mealsRecipeID.flat());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const handleSubmit = (e) =>{
  e.preventDefault()
  const IMC = (peso) / (altura/100)**2
  if (IMC < 18.5) {
    fetchData(1600,2000,160,600,480,900,320,900)
  }else if(IMC >= 18.5 && IMC < 25){
    fetchData(1400,1800,140,540,420,810,280,810)
  }else if(IMC >= 25 && IMC < 30){
    fetchData(1200,1600,120,480,360,720,240,720)
  }else if(IMC >= 30 && IMC < 35){
    fetchData(1000,1400,100,420,300,630,200,630)
  }else if(IMC >= 35 && IMC < 40){
    fetchData(800,1200,80,360,240,540,160,540)
  }else{
    fetchData(400,1000,40,300,120,450,80,450)
  }
  navigate("/plan")
}
 const handleChangeDiet =  (e) =>{
  if(e.target.checked){
    setCheckedIDDiet([...checkedIDDiet,e.target.id])
  }else{
    setCheckedIDDiet(checkedIDDiet.filter(id => id != e.target.id))
  }
 }
 const handleChangeAllergies =  (e) => {
  if(e.target.checked){
    setCheckedIDAllergies([...checkedIDAllergies,e.target.id])
  }else{
    setCheckedIDAllergies(checkedIDAllergies.filter(id => id != e.target.id))
  }
 }
  useEffect(() => {
    const diet = checkedIDDiet.map(val =>
      dietType.find(payload => payload.id === val)
    ).map(res => res.data)
   setDietHealth(diet)
  }, [checkedIDDiet])

  useEffect(() =>{
    const allergy = checkedIDAllergies.map(val =>
      allergies.find(payload => payload.id === val)
      ).map(resp => resp.data).flat()
      setAllergiesCare(allergy)
  },[checkedIDAllergies])


console.log(peso)
console.log(altura)
console.log(checkedIDDiet)
console.log(checkedIDAllergies)
console.log(dietHealth)
console.log(allergiesCare)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>PERSONAL INFORMATION FOR DIETARY PLAN</h5>
        <div className="mainValues">
          <label htmlFor="weight">weigth(kg):</label>
          <input type="number" id="weight" onChange={(e) => setPeso(e.target.value)} required></input>
          <label htmlFor="height">height(cm):</label>
          <input type="number" id="height" onChange={(e) => setAltura(e.target.value)} required></input>
        </div>
        
        <div>
          <div className="dietType">
            Diet Type:
          </div>

          {
            dietType.map(value =>
              <div key={value.id}>
                <label htmlFor={value.id}>{value.name}</label>
                <input type="checkbox" id={value.id} onChange={handleChangeDiet} />
              </div>)
          }
        </div>
        
        <div>
          <div className="dietSpecial">
            Allergies and Health Care:
          </div>
          {
            allergies.map(value =>
              <div key={value.id}>
                <label htmlFor={value.id}>{value.name}</label>
                <input type="checkbox" id={value.id} onChange={handleChangeAllergies} />
              </div>
            )
          }
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default DataEntry