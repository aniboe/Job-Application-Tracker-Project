import React from 'react'

import { useSelector } from "react-redux"
import { allAplications } from '../../redux/slices/aplicationData.slice.js'
import RecentAplication from '../dashboard/cards/RecentAplication.jsx'


import { CiCirclePlus } from "react-icons/ci";
import { LuTextSearch } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import ApplicationCard from './card/ApplicationCard.jsx';


function Application() {

  const applicationData = useSelector(allAplications)
  // console.log("is data coming from here: " ,applicationData);
  
  


  return (
    <div className='flex flex-col w-full h-full p-5 gap-5 bg-gray-200'>

      {/* TopBar */}
      <div className='h-10 flex items-center rounded-md'>

        {/* search div */}
        <div className='h-full flex items-center bg-white px-3 py-1 rounded-md'>
          <LuTextSearch size={25} className='text-gray-500'/>
          <input className='w-2xl outline-0 border-0 text-[18px] text-gray-600 px-2' type="text" name=""  placeholder='search applications.....'/>
        </div>




        {/* filter and add div */}
        <div className='h-full flex-1 flex items-center justify-between px-5'>

          {/* filter */}
          <div className='w-25 border-2 border-gray-300 px-3 py-1 rounded-md flex justify-center'>
            <select className='border-0 outline-0 text-center' name="" id="">
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          
          {/* add application */}
          <div className='h-full '>
            <button className='h-full flex items-center gap-1 bg-blue-500 text-white pl-2 pr-3 rounded-md text-[17px]'>
              <IoIosAdd size={24}/>
              <h4>Add</h4>
            </button>
          </div>

        </div>

      </div>



      {/*application render box */}
      <div className=' bg-white flex-1 rounded-md overflow-hidden'>
        <div className='bg-white h-10 grid grid-cols-12 gap-1 px-2 text-[17px] items-center border-b border-gray-300'>
          <h1 className='text-gray-600 col-span-5 pl-20'>Role</h1>
          <h1 className='text-gray-600 col-span-5 pl-10'>Location</h1>
          <h1 className='text-gray-600 col-span-1'>Date</h1>
          <h1 className='text-gray-600 col-span-1 text-center'>Status</h1>
        </div>


        <div className='flex flex-col gap-1'>
          <ApplicationCard/> 
        </div>

      </div>

    </div>
  )
}

export default Application