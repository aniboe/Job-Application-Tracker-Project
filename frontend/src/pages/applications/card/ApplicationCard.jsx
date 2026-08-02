import React from 'react'

function ApplicationCard({ applicationData }) {
  // console.log(applicationData);
  
  return (
    <div className='bg-gray-300 h-14 grid grid-cols-12 items-center px-2 rounded-xl mx-2  '>
      {/* role part */}
      <div className='col-span-4 flex items-center pl-4'>

        <div className='bg-blue-400 h-9 w-9 flex items-center justify-center rounded-full'>
          <h1>{applicationData?.companyName?.slice(0, 1)}</h1>
        </div>

        <div className='pl-6'>
          <div>{applicationData?.role}</div>
          <div>{applicationData?.companyName}</div>
        </div>

      </div>


      {/* location part */}
      <div className='col-span-4 pl-13'>
        {applicationData?.location}
      </div>

      {/* salary range */}
      <div className='col-span-2'>
        {applicationData?.salaryRange}
      </div>

      {/* date part */}
      <div className='col-span-1'>{applicationData?.createdAt?.slice(0, 10)}</div>

      {/* status part */}
      <div className='col-span-1 text-center'>{applicationData?.status}</div>
    </div>
  )
}

export default ApplicationCard