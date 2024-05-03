import React, { memo } from 'react'
import Sidebar from '../Sidebar'
import TestPage from '../TestPage'
import { Link } from 'react-router-dom'
import Mainpage2 from '../Mainpage2'

function TestPage2() {
  return (
    <div>
        <Sidebar inner={<Mainpage2 />}/>

    </div>
  )
}

export default memo(TestPage2)