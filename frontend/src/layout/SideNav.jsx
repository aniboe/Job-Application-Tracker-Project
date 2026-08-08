import React from 'react'
import { Link } from "react-router-dom"

const imag = "https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-network-placeholder-png-image_6398266.jpg"

function SideNav() {
  return (
    <div className='bg-[#EDECEC] h-screen w-52 border-r border-[#DFDEDE] mx overflow-y-auto'>
       <div className='mx-4'>
            <div className='text-4xl font-bold text-center pt-5'>
                <h1 className='text-blue-600'>L Tracker</h1>
            </div>

            <div className='mt-6'>
                <h2 className='text-[11px] px-1 mb-1'>MAIN MENU</h2>
                <hr className='text-[#B2B1B1] mb-4 border-[1.5px] rounded-full'/>

                <div>
                    <ul className='flex flex-col gap-1'>

                        {/* NOTE: remove all the li's and make it into a saperate component later */}

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <Link to="/dashboard" className='flex items-center'>
                                <p className='text-lg font-bold' >L</p>
                                <h1 className='text-lg text-left pl-2'>Dashboard</h1>
                            </Link>
                        </li>
 

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <Link to="/applications" className='flex items-center'>
                                <p className='text-lg font-bold' >A</p>
                                <h1 className='text-lg text-left pl-2'>Application</h1>
                            </Link>
                        </li>
 

                        <li className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                            <Link to="/kanban" className='flex items-center'>
                                <p className='text-lg font-bold' >K</p>
                                <h1 className='text-lg text-left pl-2'>Kanban Board</h1>
                            </Link>
                        </li>
 


                    </ul>
                </div>

                <div className='mt-4'>
                    <h2 className='text-[11px] px-1 mb-1'>PREFERENCES</h2>
                    <hr className='text-[#B2B1B1] mb-4 border-[1.5px] rounded-full'/>


                    <div>
                        <ul className='flex flex-col gap-1'>

                            <Link to="#" className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                                <div className='flex items-center'>
                                    <p className='text-lg font-bold' >P</p>
                                    <h1 className='text-lg text-left pl-2'>Profile</h1>
                                </div>
                            </Link>
    

                            <Link to="#"className='pl-6 h-11 rounded-xl flex  justify-start text-zinc-600 hover:bg-blue-100 hover:text-blue-700'>
                                <div className='flex items-center'>
                                    <p className='text-lg font-bold' >S</p>
                                    <h1 className='text-lg text-left pl-2'>Settings</h1>
                                </div>
                            </Link>
    


                        </ul>
                    </div>


                </div>

            </div>
       </div>
    </div>
  )
}

export default SideNav