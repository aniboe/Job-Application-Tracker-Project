import React, { useEffect } from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes, useNavigate } from "react-router-dom"
import Layout from './layout/Layout'
import Dash from './pages/dashboard/Dash'
import Landing from './pages/landing/Landing'
import Application from './pages/applications/Application.jsx'
import { api } from './main.jsx'
import { useDispatch } from "react-redux"
import { addApplicationData } from './redux/slices/aplicationData.slice.js'
import { addUserData } from './redux/slices/userData.slice.js'
import NotFound from './pages/not-Found/NotFound.jsx'
import Setting from './pages/settings/Setting.jsx'
import KanBan from './pages/kanbanBoard/KanBan.jsx'


//  this function calles the application and used in more then one place i gues 
export const getApplications = async(dispatchInstance) => {
  try {
    const allData = await api.get(`/data/get-all-data`)
    dispatchInstance(addApplicationData(allData?.data))
  } catch (error) {
    console.error("Error fetching applications:", error)
  }
}


function App() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  useEffect(() => {
    const runThis = async () => {
      await getApplications(dispatch) // passing dispatch inside outer function because it doesnt have acces to it 
      
      try {
        const userData = await api.get(`/user/me`)
        
        dispatch(addUserData(userData?.data.data))
      } catch (error) {
        console.error("user not authenticated");
        Navigate("/")
      }
    }
    runThis()
    
  },[])

  return (
    <>
    <div className='w-full h-10 bg-red-200 flex items-center justify-center'>
      <h1 className='text-red-500 text-xl font-semibold'>This site is Under Progress</h1>
    </div>

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
          <Route path="/settings" element={<Setting/>} />
          <Route path="/kanban" element={<KanBan/>} />
        </Route>

      </Routes>

    </>
  )
}

export default App