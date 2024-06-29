import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../../pages/Homepage'
import IntSignUp from '../../pages/IntSignUp'
import Mainpage from '../../pages/Mainpage'
import Sidebar from '../Sidebar'
import JobInfo from '../../pages/JobInfo'
import Jobs from '../../pages/Jobs'
import Interviewers from '../../pages/Interviewers'
import UserSignup from '../../pages/UserSignup'
import Freelance from '../../pages/Freelance'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/interviewer/signup' element={<IntSignUp />}/>
        <Route path='/user/signup' element={<UserSignup />}/>
        <Route path='/browse' element={<Mainpage />}/>
        <Route path='/jobs' element={<Sidebar children={<Jobs />}/>}/>
        <Route path='/jobs/:id' element={<Sidebar children={<JobInfo />}/>} />
        <Route path='/interviewers' element={<Sidebar children={<Interviewers />} />}/>
        <Route path='/gigs' element={<Sidebar children={<Freelance />}/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes;