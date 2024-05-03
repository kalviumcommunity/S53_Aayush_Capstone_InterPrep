import React from 'react'
import Sidebar from '../Sidebar'
import TestPage from '../TestPage'

function Mainpage() {
  return (
    <div>
        <Sidebar inner={<TestPage />}/>
        Hey
    </div>
  )
}

export default Mainpage