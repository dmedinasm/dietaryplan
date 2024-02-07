import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'
import { Grid } from 'react-loader-spinner'
import { getMealsData } from '../fetch/mealsData'
import { days } from '../data/days'
import DayPlan from './DayPlan'
import { useLoader } from '../hooks/useLoader'
const Plan = () => {
  const loading = useLoader()
  const { mealsId } = useContext(Context)
  const [mealsRendered, setMealsRendered] = useState([])
  const navigation = useNavigate()
  console.log(mealsId)
 
  //Array de promesas para que lleguen en orden
  useEffect(() => {
    if (!mealsId) return
    Promise.all(mealsId.map(getMealsData))
      .then(dataArray => setMealsRendered(dataArray));
  }, [mealsId]);

  return (
    <>  
        {loading ?
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

            {
              days.map((valor, index) => 
              <DayPlan key={index} day={valor} dataMeal={mealsRendered.slice(index * 3, index * 3 + 3)} />
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