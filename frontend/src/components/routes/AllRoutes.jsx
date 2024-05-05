import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import IntSignUp from '../Pages/IntSignUp'
import Mainpage from '../Pages/Mainpage'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/interviewer/signup' element={<IntSignUp />}/>
        <Route path='/browse' element={<Mainpage />}/>
    </Routes>
    </>
  )
}

export default AllRoutes