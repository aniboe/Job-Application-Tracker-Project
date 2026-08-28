import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { addApplicationData } from '../../redux/slices/aplicationData.slice.js'
import { addUserData, userValue } from '../../redux/slices/userData.slice.js'
import { backendUrl } from '../../App' 

export function Login() {
    const userData = useSelector(userValue)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    if(userData.username) Navigate("/dashboard") // gigure out how to remove instence of it 


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState()



    const runMe = async() => {
        try {
            const applicationData = await axios.get(`${backendUrl}/data/get-all-data`, {withCredentials: true})
            const userData = await axios.get(`${backendUrl}/user/me`, {withCredentials: true})
            
            dispatch(addApplicationData(applicationData?.data))
            dispatch(addUserData(userData?.data.data))
        } catch (error) {
            console.log("some thing went wrong while fetching data", error.message)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const sendData = await axios.post(`${backendUrl}/user/login`, 
                {
                    usernameOrEmail: username.toLocaleLowerCase(),
                    password: password
                },
                {withCredentials: true}
            )
            setUsername("")
            setPassword("")
            
            runMe()
            Navigate("/dashboard")
        } catch (error) {
            // console.log(error.response.data.message)
            setErrors(error.response.data.message)
            setTimeout(()=> {
                setErrors("")
            },3000)
        }
    } 
  return (
    <>
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='bg-[#F1F0F0] flex flex-col p-6 rounded-2xl text-center min-h-110 min-w-96 relative drop-shadow-2xl'>

                <h1 className=' text-3xl font-bold mb-4'>
                    Login
                </h1>

                <form
                onSubmit={submitHandler} 
                className=' p-1 rounded-sm h-auto '>

                    <div className='text-red-600 mb-2'>{errors ?? errors}</div>

                    <div>
                        <div className='flex flex-col text-left mb-3'>

                            <label className='text-gray-500 text-md '
                            htmlFor=""
                            >
                                Username
                            </label>

                            <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="text"
                            autoComplete='username'
                            required 
                            />
                        </div>

                        <div className='flex flex-col text-left mb-3'>

                            <label className='text-gray-500 text-md '
                            htmlFor=""
                            >
                                Password
                            </label>

                            <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="password"
                            autoComplete='current-password'
                            required
                            />
                        </div>
                    </div>
                    
                    <div className='text-right text-zinc-500 text-[15px] hover:underline'>
                        <a className='cursor-not-allowed' href="#">forgot password?</a>
                    </div>

                    <div className='w-full   mt-5'>
                        <button type='submit'
                        className='bg-blue-800 text-white w-full pt-2 pb-2 rounded-xl'>login</button>
                    </div>
                </form>



                <div className='my-4 mx-1 relative flex items-center justify-center'>
                    <hr className='w-full border-gray-400 border rounded-2xl'/>
                    <span
                    className='text-xl absolute bg-[#F1F0F0] px-2 mb-1.5'
                    >
                        or
                    </span>
                </div>



                <div className='flex-1 flex flex-col justify-around items-center'>
                    
                    <div className='border-2 border-zinc-400 text-zinc-400 font-bold px-3 py-1 rounded-xl hover:cursor-not-allowed'>
                        <button
                        disabled 
                            className='flex items-center gap-0.5 grayscale-100 hover:cursor-not-allowed' // remove grayscale when not working
                        >
                            <img 
                            className='h-5'
                            src="src\assets\icons8-google-logo-100.png" alt="" />
                            <h1>Google</h1>
                        </button>

                    </div>

                    

                </div>

                <div className='text-right text-zinc-500 text-[15px] mt-4'>
                    <Link to="/register">Not registered ? <span className='text-blue-800 hover:underline'>register here</span></Link>
                </div>

            </div>
        </div>
    </>
  )
}

export default Login