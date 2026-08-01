import React from 'react'

function ApplicationCard() {
  return (
    <div className='bg-gray-300 h-15 grid grid-cols-12 gap-1 px-2'>
      {/* role part */}
      <div className='col-span-5'>
        <div>img</div>
        <div>
          <div>role</div>
          <div>company name</div>
        </div>
      </div>


      {/* location part */}
      <div className='col-span-5'>
        location
      </div>

      {/* date part */}
      <div className='col-span-1'>data</div>

      {/* status part */}
      <div className='col-span-1'>status</div>
    </div>
  )
}

export default ApplicationCard