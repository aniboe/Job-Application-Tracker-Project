import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux"
import { allAplications } from '../../redux/slices/aplicationData.slice.js'
import RecentAplication from '../dashboard/cards/RecentAplication.jsx'


import { CiCirclePlus } from "react-icons/ci";
import { LuTextSearch } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import ApplicationCard from './card/ApplicationCard.jsx';
import NewApplication from './card/NewApplication.jsx';
import ApplicationPopup from './card/ApplicationPopup.jsx';
import EditApplication from './card/EditApplication.jsx';
import DeleteWarning from './card/DeleteWarning.jsx';


function Application() {

  const applicationData = useSelector(allAplications)
  // console.log("is data coming from here: ",applicationData);
  
  const [addApplication, setAddApplication] = useState(false) // add new application
  const [showApplication, setSetshowApplication] = useState(false) // application details popup card
  const [selectedApplication, setSelectedApplication] = useState({}) // data for aplication popup card to show
  const [editApplication, setEditApplication] = useState(false) // edit application detail
  const [showDeleteWarning, setShowDeleteWarning] = useState(false) // shows delete application warning
  
  


  return (
    <>
      <div className="flex flex-col w-full h-full gap-2 ">

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
              <button className='h-full flex items-center gap-1 bg-blue-500 text-white pl-2 pr-3 rounded-md text-[17px]'
                onClick={() => {
                  setAddApplication(true)
                }}
              >
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
            {applicationData?.slice().reverse().map((value) => (
              <ApplicationCard 
                key={value._id}
                cardData={value}
                setSelectedApplication={setSelectedApplication}
                applicationData={value}
                setEditApplication={setEditApplication}
                setShowDeleteWarning={setShowDeleteWarning}
                // setSetshowApplication={setSetshowApplication}
                onClick={(e)=> {
                  setSetshowApplication(true)
                  setSelectedApplication(value)
                }}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Pop up create application form  */}
      {addApplication && (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/55'
          onClick={() => setAddApplication(false)}
        >
          <NewApplication setAddApplication={setAddApplication} />
        </div>
      )}

      {/* pop up show job details  */}
      {showApplication && (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/55'
          onClick={() => setSetshowApplication(false)}
        >
          <ApplicationPopup 
            selectedApplication={selectedApplication} 
            setEditApplication={setEditApplication} 
            setSetshowApplication={setSetshowApplication}
            setShowDeleteWarning={setShowDeleteWarning}
          />
        </div>
      )}

      {/* edit job details  */}
      {editApplication && (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/55'
          onClick={() => setEditApplication(false)}
        >
          <EditApplication 
            selectedApplication={selectedApplication} 
            setEditApplication={setEditApplication} 
            setSetshowApplication={setSetshowApplication}
            showApplication={showApplication}
            setSelectedApplication={setSelectedApplication}
          />
        </div>
      )}

      {/* delete job applicaion  */}
      {showDeleteWarning && (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/55'
          // onClick={() => setEditApplication(false)}
        >
          <DeleteWarning 
            selectedApplication={selectedApplication} 
            setShowDeleteWarning={setShowDeleteWarning}  
            setSetshowApplication={setSetshowApplication}
          />
        </div>
      )}
    </>
    
  )
}

export default Application