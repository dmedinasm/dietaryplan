import React from 'react'
import Meal from './Meal'
const DayPlan = ({day,dataMeal}) => {
  return (
    <>
      <div className="dayContainer">
        <div className="day">Day {day}</div>
        {
          dataMeal.map((item, index) =>
            <div key={index}>

              {
                index === 0
                  ?
                  <div>
                    <div className="labelBr">Breakfast</div>
                    <div className="iconBr"><img src="./assets/images/tab-icon-02.png" alt="iconBr" /></div>
                  </div>
                  : index === 1 ?
                    <div>
                     <div className="labelLunch">Lunch</div>
                       <div className="iconLunch"><img src="./assets/images/tab-icon-01.png" alt="iconLunch" /></div>
                    </div>
                    : index === 2 ?
                      <div>
                        <div className="labelDinner">Dinner</div>
                        <div className="iconDinner"><img src="./assets/images/tab-icon-03.png" alt="iconDinner" /></div>
                      </div>
                      : null
              }
              <Meal
                title={item.recipe.label}
                image={item.recipe.images.SMALL.url}
                kcal={Math.floor(item.recipe.totalNutrients.ENERC_KCAL.quantity)}
                carb={Math.floor(item.recipe.totalNutrients.CHOCDF.quantity)}
                fat={Math.floor(item.recipe.totalNutrients.FAT.quantity)}
                protein={Math.floor(item.recipe.totalNutrients.PROCNT.quantity)}
                link={item.recipe.url}
              />
            </div>

          )
        }
      </div>
    </>
  )
}

export default DayPlan