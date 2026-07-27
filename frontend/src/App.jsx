import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import Dash from './pages/dashboard/Dash'
import Landing from './pages/landing/Landing'

function App() {
  return (
    <>
      <Routes>

        {/* Public routes */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>



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
        </Route>

      </Routes>

    </>
  )
}

export default App