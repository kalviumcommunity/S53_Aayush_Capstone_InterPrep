import React, { memo } from 'react'
import Sidebar from '../Sidebar'
import TestPage from '../TestPage'

function Mainpage() {
  return (
    <div>
        <Sidebar inner={<TestPage />}/>
    </div>
  )
}

export default memo(Mainpage)