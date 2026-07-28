import React from 'react'

function RecentAplication({cardDetails}) {

  
  return (
    <> 
      <div className='px-3 py-2 flex gap-3 items-center'>
          <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
          <h1 className='uppercase'>{cardDetails.companyName.slice(0,1)}</h1>
          </div>

          <div className='flex flex-col'>
            <h1 className='font-bold leading-tight'>{cardDetails.role}</h1>
            <div className='flex gap-3'>
              <p className='text-sm leading-tight'>{cardDetails.companyName}</p>
              <p className='text-sm leading-tight'>{cardDetails.location}</p>
            </div>
          </div>
      </div>

      <div className='flex gap-3 pr-3 items-center'>
          <div>{cardDetails.createdAt.slice(0,9)}</div>
          <div>{cardDetails.status}</div>
      </div>
    </>
  )
}

export default RecentAplication