import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

import LineGaph from './chart/LineGaph'
import BarGraph from './chart/BarGraph'
import { useEffect } from 'react'
import { useState } from 'react'
import RecentAplication from './cards/RecentAplication'

import { addApplicationData } from '../../redux/slices/aplicationData.slice.js'
import { useSelector } from "react-redux"
import { allAplications } from '../../redux/slices/aplicationData.slice.js'
import { backendUrl } from '../../App.jsx'




function Dash() {

  // xdont need this line because "recentTenApplication" is derived from redix state
  // const [recentApplications, setRecentApplications] = useState([]) 
  const [cardStatusCount, setCardStatusCount] = useState({})
  const [lineGraphData, setLineGraphData] = useState([])

  
  // this is derived from redux state
  // const recentTenApplication = useSelector(allAplications).slice().reverse().slice(0,10) 
  const recentTenApplication = useSelector(allAplications)?.slice(-15).reverse()
  


  // get status count
  useEffect(() => {

    const runThis = async() => {
      try {
        const statusData = await axios.get(`${backendUrl}/data/get-graph-data`, {withCredentials: true})
        // console.log(statusData.data);
        
        // converting data for CARDS from "{_id: 'Applied', count: 8}" => "{Applied: 8}"
        const properObjectData = statusData.data.statusAndBarGraphData.reduce((acc,{_id, count}) => {
          acc[_id] = count
          return acc
        }, {})
        
        // setRecentApplications(recentTenApplication) // this has to be done outside sinde data is being recieved from redux not this api
        setLineGraphData(statusData?.data.lineGraphData)
        setCardStatusCount(properObjectData)
        
      }
      catch (error) {
        console.log("somethig went : ",error); // later pass it into error State
      }
    }
    runThis()
  },[])


  return (
    <div className='h-full flex flex-col gap-3 overflow-hidden'>
      {/* remove height so that it can cover as much as cild allows */}



      {/*NOTE: information part of the page (have to convert into individual components) */}

      <div className='h-full flex flex-col gap-3'>

        <div className='h-20 grid grid-cols-10 gap-3 shrink-0'>
        
          <div className=' bg-gray-300 col-span-2 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>{cardStatusCount.Applied  || "null"}</h1>
            <p className=''>Applied</p>
          </div>

          
          <div className=' bg-gray-300 col-span-2 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>{cardStatusCount.Interview  || "null"}</h1>
            <p className=''>Interview</p>
          </div>

          
          <div className=' bg-gray-300 col-span-2 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>{cardStatusCount.Offer  || "null"}</h1>
            <p className=''>Offer</p>
          </div>

          
          <div className=' bg-gray-300 col-span-2 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>{cardStatusCount.Rejected || "null"}</h1>
            <p className=''>Rejected</p>
          </div>


          <div className=' bg-gray-300 col-span-2 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>{cardStatusCount.Accepted  || "null"}</h1>
            <p className=''>Accepted</p>
          </div>
          
        </div>
        
        





        {/*NOTE: graph part */}
        <div className='h-80 grid grid-cols-12 gap-7 shrink-0'>

          <div className='p-4 col-span-7 bg-zinc-300 rounded-xl flex items-center justify-center'>
            <LineGaph  lineGraphData = { lineGraphData }/>
          </div>

          <div className='p-4 col-span-5 bg-zinc-300
           rounded-xl flex items-center justify-center'>
            <BarGraph   barGraphData = { cardStatusCount }/>
          </div>
        </div>




        {/* NOTE: recent applications */}
        <div className='bg-white flex-1 flex flex-col min-h-0 rounded-md'>
          <div className='flex items-center justify-between border-b border-zinc-500 p-3 '>
            <h1 className='text-xl font-bold mx-2'>Your recent L's</h1>
            <Link to="/applications" className='text-blue-700'>see all L's </Link>
          </div>

          
          {/* list of ls */}
          <div className='flex-1 flex flex-col gap-1 overflow-y-auto my-1'>
            {recentTenApplication?.map((val)=>( // not using "sort()" because "reverse()" works better here 
              <RecentAplication key={val._id}  applicationData = {val}/>  
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dash