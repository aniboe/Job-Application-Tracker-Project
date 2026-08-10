import React from 'react'
import { useLocation } from "react-router-dom"
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux"
import { userValue } from '../redux/slices/userData.slice.js';

function TopBar() {

    const location = useLocation()
    const userData = useSelector(userValue)
    
    
    const getTitle = (url) => {
        switch (url) {
            case "/dashboard":
                return "Dashboard"
                break;
            case "/applications":
                return "Applications"
                break;
        }
    }

    return (
        <div className=' flex h-17 bg-gray-200 mb-2 rounded-md'>

            <div className='w-full mx-9 my-3 flex items-center justify-between'>

                <div className='w-full flex justify-between items-center flex-1'>
                    
                    <div className=' bg-[#E8E7E7] flex items-center cursor-not-allowed px-3 rounded-xl'>

                        {/* <img src="" alt="" /> */}

                        <div>
                            <h1 className='text-2xl font-bold'>{getTitle(location.pathname)}</h1>
                            <p>{ new Date().toDateString() }</p>
                        </div>
                        
                    </div>

                    <div>
                        <IoIosNotificationsOutline  size={24}/>
                    </div>
                </div>

                
                <div className='h-full border-l m-3 '/>


                <div className='flex items-center min-w-24 gap-2'>
                    <div className='h-11 w-11 bg bg-blue-500 text-white rounded-full'>
                        { userData ? (
                            <div className=''>
                                <img src="https://imgs.search.brave.com/ayKjcLkcL42SwKfHeGx88UTR16QEd12JFng24-54OEk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL2RlZmF1bHQt/cHJvZmlsZS1waWN0/dXJlLXBsYWNlaG9s/ZGVyLXFjb2ZtaGg0/bmNvcG03OG0ud2Vi/cA" alt="" />
                            </div>
                        ) : (
                            <div className=' h-full flex items-center justify-center'>
                                <h1>{ userData?.username.slice(0, 1).toUpperCase() }</h1>
                            </div>
                        )}
                    </div>
                    <h3 className='text-xl'>{ userData?.username }</h3>
                </div>
            </div>
        </div>
    )
}

export default TopBar