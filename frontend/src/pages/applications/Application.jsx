import React from 'react'

import { useSelector } from "react-redux"
import { allAplications } from '../../redux/slices/aplicationData.slice.js'

function Application() {

  const applicationData = useSelector(allAplications)
  


  return (
    <div>this is aplication</div>
  )
}

export default Application