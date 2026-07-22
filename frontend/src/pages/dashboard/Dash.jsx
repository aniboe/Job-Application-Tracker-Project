import React from 'react'
import LineGaph from './chart/LineGaph'
import BarGraph from './chart/BarGraph'

function Dash() {
  return (
    <div className='w-full h-full p-5 grid gap-7'>


      
      {/* Header of page */}

      <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>todays date</p>
      </div>





      {/*NOTE: information part of the page (have to convert into individual components) */}

      <div className='grid gap-7'>
        <div className='h-20 grid grid-cols-12 gap-7'>


          <div className=' bg-gray-200 col-span-3 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>5</h1>
            <p className=''>Application</p>
          </div>

          
          <div className=' bg-gray-200 col-span-3 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>5</h1>
            <p className=''>Interview</p>
          </div>

          
          <div className=' bg-gray-200 col-span-3 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>5</h1>
            <p className=''>Offer</p>
          </div>

          
          <div className=' bg-gray-200 col-span-3 p-4 rounded-xl'>
            <h1 className='text-xl font-bold text-gray-700'>5</h1>
            <p className=''>Rejected</p>
          </div>

          
        </div>
        
        





        {/*NOTE: graph part */}
        <div className='h-80 grid grid-cols-12 gap-7'>

          <div className='p-4 col-span-7 bg-zinc-300 rounded-xl flex items-center justify-center'>
            <LineGaph/>
          </div>

          <div className='p-4 col-span-5 bg-zinc-300
           rounded-xl flex items-center justify-center'>
            <BarGraph/>
          </div>
        </div>




        {/* NOTE: recent applications */}
        <div className=' bg-zinc-300 mb-5 h-auto rounded-xl border border-zinc-500 overflow-hidden'>
          <div className='flex items-center justify-between border-b border-zinc-500 p-3 '>
            <h1 className='text-xl font-bold mx-2'>Your recent L's</h1>
            <a href="#" className='text-blue-700'>see all L's </a>
          </div>






          {/* list of ls */}
          <div className='border-b border-zinc-500 flex justify-between last:border-0'>
            
            <div className='px-3 py-2 flex gap-3 items-center'>
              <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
                <h1>L</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-bold leading-tight'>Dev role</h1>
                <p className='text-sm leading-tight'>company name</p>
              </div>
            </div>

            <div className='flex gap-3 pr-3 items-center'>
              <div>time</div>
              <div>status</div>
            </div>

          </div>
          
          <div className='border-b border-zinc-500 flex justify-between last:border-0'>
            
            <div className='px-3 py-2 flex gap-3 items-center'>
              <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
                <h1>L</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-bold leading-tight'>Dev role</h1>
                <p className='text-sm leading-tight'>company name</p>
              </div>
            </div>

            <div className='flex gap-3 pr-3 items-center'>
              <div>time</div>
              <div>status</div>
            </div>

          </div>

          <div className='border-b border-zinc-500 flex justify-between last:border-0'>
            
            <div className='px-3 py-2 flex gap-3 items-center'>
              <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
                <h1>L</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-bold leading-tight'>Dev role</h1>
                <p className='text-sm leading-tight'>company name</p>
              </div>
            </div>

            <div className='flex gap-3 pr-3 items-center'>
              <div>time</div>
              <div>status</div>
            </div>

          </div>

          <div className='border-b border-zinc-500 flex justify-between last:border-0'>
            
            <div className='px-3 py-2 flex gap-3 items-center'>
              <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
                <h1>L</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-bold leading-tight'>Dev role</h1>
                <p className='text-sm leading-tight'>company name</p>
              </div>
            </div>

            <div className='flex gap-3 pr-3 items-center'>
              <div>time</div>
              <div>status</div>
            </div>

          </div>

          <div className='border-b border-zinc-500 flex justify-between last:border-0'>
            
            <div className='px-3 py-2 flex gap-3 items-center'>
              <div className='bg-white h-10 w-10 rounded-xl flex items-center justify-center font-bold'>
                <h1>L</h1>
              </div>

              <div className='flex flex-col'>
                <h1 className='font-bold leading-tight'>Dev role</h1>
                <p className='text-sm leading-tight'>company name</p>
              </div>
            </div>

            <div className='flex gap-3 pr-3 items-center'>
              <div>time</div>
              <div>status</div>
            </div>

          </div>





        </div>










      </div>
    </div>
  )
}

export default Dash