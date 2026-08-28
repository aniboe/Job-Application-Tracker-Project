import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from '../../App' 
import { userValue } from '../../redux/slices/userData.slice'
import { useSelector } from 'react-redux'



export function Register() {

    const Navigate = useNavigate()
    const userData = useSelector(userValue)

    if(userData.username) Navigate("/dashboard")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [errors, setErrors] = useState("")





    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if(password1 !== password2){
                // console.log("error lol")
                setErrors("password are not matched")
                setTimeout(() => {
                    setErrors("")
                }, 3000);
                return
            } 
            const sendData = await axios.post(`${backendUrl}/user/register`, 
                {
                    username: username.toLocaleLowerCase(),
                    email: email,
                    password: password1,
                },
                {withCredentials: true}
            )
            setUsername("")
            setEmail("")
            setPassword1("")
            setPassword2("")
            // console.log("logged in susseccfully");
            Navigate("/dashboard")
            
        } catch (error) {
            setErrors(error)
            // console.log(error.response.data.message)
            setErrors(error.response?.data.message)
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
                    Register
                </h1>

                <form 
                onSubmit={submitHandler}
                className=' p-1 rounded-sm h-auto '>

                    <div>
                        <div className='text-red-600 mb-2'>{errors ?? errors}</div>
                        <div className='flex flex-col text-left mb-3'>

                            <label className='text-gray-500 text-md '
                            htmlFor=""
                            >
                                Username
                            </label>
                            <input 
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="text" 
                            autoComplete='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </div>


                        <div className='flex flex-col text-left mb-3'>

                            <label className='text-gray-500 text-md '
                            htmlFor=""
                            >
                                Email
                            </label>
                            <input 
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="email"
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="password" 
                            autoComplete='new-password'
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                            />
                        </div>
                        <div className='flex flex-col text-left mb-3'>

                            <label className='text-gray-500 text-md '
                            htmlFor=""
                            >
                                Confirm Password
                            </label>
                            <input 
                            className='rounded-lg h-10 border border-gray-200 outline-0 text-xl text-zinc-600 px-2' 
                            type="password" 
                            autoComplete='new-password'
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                            />
                        </div>


                    </div>
                    

                    <div className='w-full   mt-6'>
                        <button type='submit' 
                        className='bg-blue-800 text-white w-full pt-2 pb-2 rounded-xl'>register</button>
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
                    <Link to="/login">Already registered ? <span className='text-blue-800 hover:underline'>login here</span></Link>
                </div>

            </div>
        </div>
    </>
  )
}

export default Register