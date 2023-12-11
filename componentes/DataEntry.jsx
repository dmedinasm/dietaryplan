import React, { useContext } from 'react'
import { Context } from '../context/Context'
import {useNavigate} from 'react-router-dom'
const DataEntry = () => {
const {setPeso} = useContext(Context)
const {setAltura} = useContext(Context)
const {setAlergic} = useContext(Context)
const {setDisease} = useContext(Context)
const navigate = useNavigate()
const handleSubmit = (e) =>{
  e.preventDefault()
  setPeso(e.target[0].value)
  setAltura(e.target[1].value)
  setAlergic(e.target[2].value)
  setDisease(e.target[3].value)
  navigate("/plan")
}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>PERSONAL INFORMATION FOR DIETARY PLAN</h5>
        <div>
          <label  htmlFor="weight">weigth(kg):</label>
          <input type="number" id="weight"></input>
        </div>
        <div>
          <label  htmlFor="height">height(m):</label>
          <input type="number" id="height"></input>
        </div>
        <div>
          <label htmlFor="alergic">alergic condition:</label>
          <input type="text" id="alergic"></input>
        </div>
        <div>
          <label htmlFor="disease">disease:</label>
          <input type="text" id="disease"></input>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default DataEntry