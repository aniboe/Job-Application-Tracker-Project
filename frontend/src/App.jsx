import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import Dash from './pages/dashboard/Dash'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={}/> */}
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
      </Routes>

      <Layout>
        <Routes>
          <Route path='/dashboard' element={<Dash/>}/>
        </Routes>
      </Layout>

    </>
  )
}

export default App