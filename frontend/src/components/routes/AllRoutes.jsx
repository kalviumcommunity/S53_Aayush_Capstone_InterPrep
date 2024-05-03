import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import SignUp from '../Pages/SignUp'
import Mainpage from '../Pages/Mainpage'
import TestPage2 from '../Pages/TestPage2'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/browse' element={<Mainpage />}/>
        <Route path='/browse2' element={<TestPage2 />}/>
    </Routes>
    </>
  )
}

export default AllRoutes