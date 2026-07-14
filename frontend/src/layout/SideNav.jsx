import React from 'react'

const imag = "https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-network-placeholder-png-image_6398266.jpg"

function SideNav() {
  return (
    <div className='bg-[#EDECEC] min-h-screen min-w-65 border-r border-[#DFDEDE] mx'>
       <div className='mx-4'>
            <div className='text-4xl font-bold text-center pt-5'>
                <h1 className='text-blue-600'>L Tracker</h1>
            </div>

            <div className='mt-6'>
                <h2 className='text-[11px] px-1 mb-1'>MAIN MENU</h2>
                <hr className='text-[#B2B1B1] mb-4 border-[1.5px] rounded-full'/>

                <div>
                    <ul className='flex flex-col gap-1'>

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <div className='flex items-center'>
                                <p className='text-lg font-bold' >L</p>
                                <h1 className='text-lg text-left pl-2'>Dashboard</h1>
                            </div>
                        </li>
 

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <div className='flex items-center'>
                                <p className='text-lg font-bold' >A</p>
                                <h1 className='text-lg text-left pl-2'>Application</h1>
                            </div>
                        </li>
 

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <div className='flex items-center'>
                                <p className='text-lg font-bold' >K</p>
                                <h1 className='text-lg text-left pl-2'>Kanban Board</h1>
                            </div>
                        </li>
 


                    </ul>
                </div>

                <div className='mt-4'>
                    <h2 className='text-[11px] px-1 mb-1'>PREFERENCES</h2>
                    <hr className='text-[#B2B1B1] mb-4 border-[1.5px] rounded-full'/>


                    <div>
                        <ul className='flex flex-col gap-1'>

                            <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                                <div className='flex items-center'>
                                    <p className='text-lg font-bold' >P</p>
                                    <h1 className='text-lg text-left pl-2'>Profile</h1>
                                </div>
                            </li>
    

                            <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                                <div className='flex items-center'>
                                    <p className='text-lg font-bold' >S</p>
                                    <h1 className='text-lg text-left pl-2'>Settings</h1>
                                </div>
                            </li>
    


                        </ul>
                    </div>


                </div>

            </div>
       </div>
    </div>
  )
}

export default SideNav