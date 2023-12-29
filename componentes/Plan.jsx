import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import Meal from './Meal'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'react-loader-spinner'
import { mealsData } from '../fetch/fetch'
const Plan = () => {
  const { mealsId } = useContext(Context)
  const [mealsRendered, setMealsRendered] = useState([])
  const[cargando, setCargando] = useState(true)
  const navigation = useNavigate()
  console.log(mealsId)

  useEffect(() => {
    setMealsRendered([])
  }, [mealsId]);
 
  //Array de promesas paraque lleguen en orden
  useEffect(() => {
    Promise.all(mealsId.map(mealsData))
      .then(dataArray => setMealsRendered(dataArray));
  }, [mealsId]);
  useEffect(() =>{
    setTimeout(() => {
      setCargando(false);
    }, 8000)
  },[mealsRendered])
  
 
  console.log(mealsId)
  console.log(mealsRendered)
  return (
    <>
          
        {cargando ?
           <div className="loader">
           <Grid
             visible={true}
             height="80"
             width="80"
             color="#FB5849"
             ariaLabel="grid-loading"
             radius="12.5"
             wrapperStyle={{}}
             wrapperClass="grid-wrapper"
           />
         </div>
         :
         mealsRendered.length < 21 
         ?
          <div className="invalidPlan">
            <div className="containerMessage">
              <p>The 7-day diet plan could not be prepared. Please enter another set of values</p>
              <button onClick={() => navigation("/")}>Accept</button>
            </div>
          </div>
         :
        <div>
          <h1 className="titlePlan">7 days diet plan</h1>
          <div className="containerPlan">
            <div className="labelBr">Breakfast</div>
            <div className="labelLunch">Lunch</div>
            <div className="labelDinner">Dinner</div>
            <div className="iconBr"><img src="./assets/images/tab-icon-02.png" alt="iconBr" /></div>
            <div className="iconLunch"><img src="./assets/images/tab-icon-01.png" alt="iconLunch" /></div>
            <div className="iconDinner"><img src="./assets/images/tab-icon-03.png" alt="iconDinner" /></div>

            {
              mealsRendered.map((valor, i) =>
                <Meal
                  key={i}
                  title={valor.recipe.label}
                  image={valor.recipe.images.SMALL.url}
                  kcal={Math.floor(valor.recipe.totalNutrients.ENERC_KCAL.quantity)}
                  carb={Math.floor(valor.recipe.totalNutrients.CHOCDF.quantity)}
                  fat={Math.floor(valor.recipe.totalNutrients.FAT.quantity)}
                  protein={Math.floor(valor.recipe.totalNutrients.PROCNT.quantity)}
                  link={valor.recipe.url}
                />
              )
            }
          </div>
          <div className="btNewPlan">
            <button onClick={() => navigation("/")} >Get New Diet Plan!</button>
          </div>
                
        </div>}

    </>
  )
}

export default Plan