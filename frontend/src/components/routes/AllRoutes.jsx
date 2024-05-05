import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import SignUp from '../Pages/SignUp'
import Mainpage from '../Pages/Mainpage'
import TestPage from '../TestPage'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/browse' element={<Mainpage />}/>
    </Routes>
    </>
  )
}

export default AllRoutes