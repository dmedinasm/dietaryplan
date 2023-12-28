import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import {useNavigate} from 'react-router-dom'
import { dietType, allergies } from '../data/data'
import { planResult } from '../fetch/fetch'

const DataEntry = () => {
const[peso, setPeso] = useState(0)
const[altura, setAltura] = useState(0)
const {setMealsID} =  useContext(Context)
const [checkedIDDiet, setCheckedIDDiet] = useState([])
const [checkedIDAllergies, setCheckedIDAllergies] = useState([])
const[dietHealth, setDietHealth] = useState()
const[allergiesCare, setAllergiesCare] = useState([])
const navigate = useNavigate()

const fetchData = async (params) => {
  try {
      const data = await planResult(
        params.kcMin,
        params.kcMax,
        params.kMinBr,
        params.kMaxBr,
        params.kcMinLunch,
        params.kcMaxLunch,
        params.kcMinDin,
        params.kcMaxDin,
        params.diet,
        params.allergy)
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
      let params = {}
  if (IMC < 18.5) {
    params = {kcMin: 1600, kcMax: 2000, kMinBr: 160, kMaxBr: 600, kcMinLunch: 480, 
    kcMaxLunch: 900, kcMinDin: 320, kcMaxDin: 900, diet: dietHealth, allergy: allergiesCare}
  }else if(IMC >= 18.5 && IMC < 25){
    params = {kcMin: 1400, kcMax: 1800, kMinBr: 140, kMaxBr: 540, kcMinLunch: 420, 
      kcMaxLunch: 810, kcMinDin: 280, kcMaxDin: 810, diet: dietHealth, allergy: allergiesCare}
  }else if(IMC >= 25 && IMC < 30){
    params = {kcMin: 1200, kcMax: 1600, kMinBr: 120, kMaxBr: 480, kcMinLunch: 360, 
      kcMaxLunch: 720, kcMinDin: 240, kcMaxDin: 720, diet: dietHealth, allergy: allergiesCare}
  }else if(IMC >= 30 && IMC < 35){
    params = {kcMin: 1000, kcMax: 1400, kMinBr: 100, kMaxBr: 420, kcMinLunch: 300, 
      kcMaxLunch: 630, kcMinDin: 200, kcMaxDin: 630, diet: dietHealth, allergy: allergiesCare}
  }else if(IMC >= 35 && IMC < 40){
    params = {kcMin: 800, kcMax: 1200, kMinBr: 80, kMaxBr: 360, kcMinLunch: 240, 
      kcMaxLunch: 540, kcMinDin: 160, kcMaxDin: 540, diet: dietHealth, allergy: allergiesCare}
  }else{
    params = {kcMin: 400, kcMax: 1000, kMinBr: 40, kMaxBr: 300, kcMinLunch: 120, 
      kcMaxLunch: 450, kcMinDin: 80, kcMaxDin: 450, diet: dietHealth, allergy: allergiesCare}
  }
  navigate("/plan")
  fetchData(params)
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

console.log(checkedIDDiet)
console.log(checkedIDAllergies)
console.log(dietHealth)
console.log(allergiesCare)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>PERSONAL INFORMATION FOR DIETARY PLAN</h5>
        <div className="mainValues">
          <div>
            <label htmlFor="weight">weigth(kg):</label>
            <input type="number" id="weight" onChange={(e) => setPeso(e.target.value)} required></input>
          </div>
          <div>
          <label htmlFor="height">height(cm):</label>
          <input type="number" id="height" onChange={(e) => setAltura(e.target.value)} required></input>
          </div>
          
        </div>
        <div className="checkboxes">
          <div className="dietHealth">
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

          <div className="allergies">
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
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default DataEntry