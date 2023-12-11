import React from 'react'
import {Routes, Route} from 'react-router-dom'
import DataEntry from '../componentes/DataEntry'
import Plan from '../componentes/Plan'
const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<DataEntry/>} />
        <Route path="/plan" element={<Plan/>}/>
    </Routes>
    </>
  )
}

export default Router