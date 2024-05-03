import React, { memo } from 'react'
import { Link } from 'react-router-dom'

function Mainpage2() {
  return (
    <>
    <div>Text Content of Test Page</div>
    <Link to={'/browse'}>Link to First Page</Link>
    </>
  )
}

export default memo(Mainpage2)