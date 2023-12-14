import React from 'react'

const Meal = ({title, image,kcal,carb,fat,protein}) => {
  return (
    <>
      <div className="card" >
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <div className="cardTitle">{title}</div>
          <h2 className="text-secondary">{kcal} kcal</h2>
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