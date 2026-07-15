import React from 'react'
import SideNav from './Sidenav.jsx'
import TopBar from './TopBar.jsx'
import Dash from "../pages/dashboard/Dash.jsx"


function Laout() {
  return (
    <>
      <div className='h-screen flex'>
        <SideNav/>

        <div className='flex flex-col flex-1'>
          <TopBar/>

          <div className='flex flex-col flex-1'>
            <Dash/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Laout