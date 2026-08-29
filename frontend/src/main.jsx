import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Always send cookies with requests to backend
axios.defaults.withCredentials = true

import { BrowserRouter } from "react-router-dom"

import { store } from './redux/store/store.js'
import { Provider } from "react-redux"

import axios from 'axios'

axios.create(
  {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
  }
)

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>
)
