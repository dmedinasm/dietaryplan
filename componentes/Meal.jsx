import React from 'react'

const Meal = ({title, image,kcal,carb,fat,protein, link}) => {
  const serving =  (carb + fat + protein)/100
  return (
    <>
      <div className="card" >
        <a href={link} target="_blank" rel="noopener noreferrer"><img className="card-img-top" src={image} alt="Card image cap" /></a>
        <div className="card-body">
          <div className="cardTitle">{title}</div>
          <h2 className="text-secondary">{Math.floor(kcal / serving)} kcal</h2>
          <div className="serving">{Math.ceil(serving)} servings</div>
          <div className="nutrition">
            <ul className="nutList">
              <li>PROTEIN</li>
              <li>FAT</li>
              <li>CARB</li>
            </ul>
            <ul className="nutQuantity">
              <li>{protein} g</li>
              <li>{fat} g</li>
              <li>{carb} g</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Meal