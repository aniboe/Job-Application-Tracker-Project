import { Link } from "react-router-dom"

function Landing() {
  
  return (
    <div className='h-screen flex flex-col gap-5 items-center justify-center '>
      <h1>page under prgress</h1>
      <Link className='text-xl font-bold text-white bg-blue-500 px-3 py-2 rounded-md' to="/login">Login</Link>
    </div>
  )
}

export default Landing