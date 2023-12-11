import React, { useContext } from 'react'
import { Context } from '../context/Context'

const Plan = () => {
  const {peso} = useContext(Context)
  const {altura} = useContext(Context)

  const IMC = (peso)/(altura/100)**2
  

  return (
    <>
      <div>Plan</div>
    </>
  )
}

export default Plan