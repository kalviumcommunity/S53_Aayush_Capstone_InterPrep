import React, { memo } from 'react'
import { Link } from 'react-router-dom'

function TestPage() {
  return (<>
    <div>This is a MainPage</div>
    <Link to={'/browse2'}>Link To other Page</Link>
  </>
  )
}
export default memo(TestPage)