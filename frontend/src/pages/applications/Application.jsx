import React, { useState } from 'react'

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

  const [addApplication, setAddApplication] = useState(true)
  
  


  return (
    <>
      <div className="flex flex-col w-full h-full p-3 gap-2 bg-gray-200 ">

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
        <div className=' bg-white flex-1 flex flex-col rounded-md overflow-hidden '>
          <div className='bg-white h-10 grid grid-cols-8 gap-1 px-2 text-[17px] items-center border-b border-gray-300'>
            <h1 className='text-gray-600 col-span-3 '>Role/Company</h1>
            <h1 className='text-gray-600 col-span-2 '>Location</h1>
            <h1 className='text-gray-600 col-span-1 '>Salary</h1>
            <h1 className='text-gray-600 col-span-1 '>Date</h1>
            <h1 className='text-gray-600 col-span-1 '>Status</h1>
          </div>


          <div className='flex-1 flex flex-col my-1 gap-2 overflow-auto '>
            {applicationData.slice().reverse().map((value) => (
              <ApplicationCard key={value._id} applicationData={value}/>
            ))}
          </div>

        </div>

      </div>

      {addApplication && (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/55'>
          <div className=''>
            <form className='bg-gray-300 rounded-md p-4 h-full stuf-inside flex flex-col ' action="">



              <div className='bg-gray-100 mb-3 rounded-md px-3 py-2'>

                <h3 className='text-2xl mb-6 text-gray-700 underline'>
                  Company Details
                </h3>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                  <label className='col-span-1 text-xl text-gray-600' htmlFor="">company name</label>
                  <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  type="text" />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                  <label className='col-span-1 text-xl text-gray-600' htmlFor="">Link</label>
                  <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  type="text" />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                  <label className='col-span-1 text-xl text-gray-600' htmlFor="">Location</label>
                  <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  type="text" />
                </div>

              </div>


              <div className='bg-gray-100 mb-3 rounded-md px-3 py-2'>

                <h3 className='text-2xl mb-6 text-gray-700 underline' >
                  Job Details
                </h3>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                  <label className='col-span-1 text-xl text-gray-600' htmlFor="">Role</label>
                  <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  type="text" />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                  <label className='col-span-1 text-xl text-gray-600' htmlFor="">Salary Range</label>
                  <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  type="text" />
                </div>

              </div>
              

              <div className='bg-gray-100 mb-3 rounded-md px-3 py-2 flex flex-col'>

                <label className='text-xl text-gray-600' htmlFor="">Status</label>

                <div className='flex justify-between gap-5 my-2'>
                  <button className='bg-[#3B82F6] cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white' type="button">Applied</button>
                  <button className='bg-[#F59E0B] cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white' type="button">Interview</button>
                  <button className='bg-[#8B5CF6] cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white' type="button">Offer</button>
                  <button className='bg-[#22C55E] cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white' type="button">Accepted</button>
                  <button className='bg-[#EF4444] cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white' type="button">Rejected</button>
                </div>
              </div>
                


              

              {/* submit or cancel */}
              <div className='flex gap-7 justify-end'>
                <button className='bg-amber-700 text-white px-3 py-1 rounded-md cursor-pointer'>cancel</button>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer' type="submit">submit</button>
              </div>


            </form>

            



          </div>
        </div>
      )}
    </>
    
  )
}

export default Application