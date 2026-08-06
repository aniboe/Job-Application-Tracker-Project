import React from 'react'


export const applicationStatusColors = {
  Applied: "#3B82F6",    // Blue
  Interview: "#F59E0B",  // Amber
  Offer: "#8B5CF6",      // Purple
  Rejected: "#EF4444",   // Red
  Accepted: "#22C55E",   // Green
};



function ApplicationCard({ applicationData }) {
  // console.log(applicationData);
  
  return (
    <div className='bg-gray-300 h-16 grid grid-cols-8 items-center px-2 rounded-md mx-2 shrink-0 hover:bg-gray-400 cursor-pointer'>
      {/* when we use flex then it trys ti shrink the div as much as posible , to prevent that we use "shrink-0" */}
      
      
      {/* role part */}
      <div className='col-span-3 flex items-center pl-2'>

        <div className='bg-gray-500 h-9 w-9 pb-1 flex items-center justify-center rounded-md'>
          <h1 className='text-xl font-bold text-white'>{applicationData?.companyName?.slice(0, 1).toUpperCase()}</h1>
        </div>

        <div className='pl-3 pt-1'>
          <div className='text-xl font-bold leading-4'>{applicationData?.role}</div>
          <div className='text-sm font-bold text-gray-500'>{applicationData?.companyName}</div>
        </div>

      </div>


      {/* location part */}
      <div className='col-span-2 text-[17px] text-gray-500'>
        {applicationData?.location}
      </div>

      {/* salary range */}
      <div className='col-span-1 text-md text-gray-500'>
        {applicationData?.salaryRange}
      </div>

      {/* date part */}
      <div className='col-span-1 text-gray-500 text-center'>{applicationData?.createdAt?.slice(0, 10)}</div>

      {/* status part */}
      <div className=' ml-2 flex justify-center'>
        <div
          className={`col-span-1 w-fit px-2 py-1.5 rounded-md text-gray-800 font-semibold`}  
          style={{backgroundColor: applicationStatusColors[applicationData?.status]}}  // dunamic style changes doesnt work in tailwind so have to do in notmal style way
        >
          <h4 className='text-center'>{applicationData?.status}</h4> 
        </div>
      </div>
    </div>
  )
}

export default ApplicationCard