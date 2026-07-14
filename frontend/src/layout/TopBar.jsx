import React from 'react'

function TopBar() {
  return (
    <div className=' flex h-17 border-b border-[#DFDEDE]'>

        <div className='w-full mx-9 my-3 flex items-center justify-between'>

            <div className='w-full flex justify-between items-center flex-1'>
                
                <div className=' bg-[#E8E7E7] flex items-center cursor-not-allowed px-3 rounded-xl'>

                    {/* <img src="" alt="" /> */}

                    <h1>🔍</h1>
                    <input 
                        className='pl-1 h-10 w-xl outline-0 text-md text-zinc-700' 
                        type='text' 
                        placeholder='search applications... (non functional)'
                    />
                </div>

                <div>
                    🔔
                    {/* this will have notification */}
                </div>
            </div>

            
            <div className='h-full border-l m-3 '/>


            <div className='flex items-center min-w-24 gap-2'>
                <p>user name</p>
                <p>PFP</p>
            </div>
        </div>
    </div>
  )
}

export default TopBar