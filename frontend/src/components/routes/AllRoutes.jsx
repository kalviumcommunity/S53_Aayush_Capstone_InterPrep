import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Homepage'
import Test from '../Test'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/test' element={<Test/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes