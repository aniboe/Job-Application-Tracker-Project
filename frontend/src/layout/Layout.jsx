import React from 'react'
import SideNav from './Sidenav.jsx'
import TopBar from './TopBar.jsx'
import { Outlet } from 'react-router-dom'


function Laout() {
  return (
    <>
      <div className='h-screen flex overflow-hidden'>
        <SideNav/>

        <div className='flex flex-col flex-1 m-1'>
          <TopBar/>

          <div className='flex flex-col flex-1 overflow-auto rounded-md '>
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Laout