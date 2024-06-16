import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../../pages/Homepage'
import IntSignUp from '../../pages/IntSignUp'
import Mainpage from '../../pages/Mainpage'
import Sidebar from '../Sidebar'
import JobInfo from '../../pages/JobInfo'
import Jobs from '../../pages/Jobs'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/interviewer/signup' element={<IntSignUp />}/>
        <Route path='/browse' element={<Mainpage />}/>
        <Route path='/jobs' element={<Sidebar children={<Jobs />}/>}/>
        <Route path='/jobs/:id' element={<Sidebar children={<JobInfo />}/>} />
    </Routes>
    </>
  )
}

export default AllRoutes;