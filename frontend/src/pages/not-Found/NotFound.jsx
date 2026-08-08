import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='h-screen bg-gray-100 flex flex-col items-center justify-center gap-3 text-xl'>
        <h1>the page u are looking for doesnt exis</h1>
        <Link className='bg-blue-600 text-white font-bold px-3 py-1 rounded-md' to="/dashboard">
            <div>Click here to go to dashboard</div>
        </Link>
    </div>
  )
}

export default NotFound