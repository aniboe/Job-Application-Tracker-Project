import React, { useEffect } from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import Dash from './pages/dashboard/Dash'
import Landing from './pages/landing/Landing'
import Application from './pages/applications/Application.jsx'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addApplicationData } from './redux/slices/aplicationData.slice.js'
import { addUserData } from './redux/slices/userData.slice.js'
import NotFound from './pages/not-Found/NotFound.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const runThis = async () => {
      const allData = await axios.get(`${backendUrl}/data/get-all-data`, {withCredentials: true})
      // console.log("redux lol:",allData.data);
      dispatch(addApplicationData(allData?.data))
      
      const userData = await axios.get(`${backendUrl}/user/me`, {withCredentials: true})
      // console.log("redux user",userData.data.data);
      dispatch(addUserData(userData?.data.data))
    }
    runThis()
    
  },[])

  return (
    <>
      <Routes>

        {/* Public routes */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='*' element={ <NotFound/> }/>



        {/* Protected routes */}

        {/* // what is this bull shit? ( we are not suposed to wrap with layout)
          <Layout>
          <Routes>
          <Route path='/dashboard' element={<Dash/>}/>
          </Routes>
          </Layout> 
        */}

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dash/>} />
          <Route path="/applications" element={<Application/>} />
        </Route>

      </Routes>

    </>
  )
}

export default App