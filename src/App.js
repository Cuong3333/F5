import React from 'react'
import './app.css'
import Sidebar from './Components/Sidebar Section/Sidebar'
import Body from './Components/Body Section/Body'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

// import react router Dom
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// Tạo 1 router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='container'><Login/></div>
  },
  {
    path: '/register',
    element: <div className='container'><Register/></div>
  },
  {
    path: '/main',
    element: <div className='container'>
      <Sidebar/>
      <Body/>
    </div>
  }
 
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
    // <div className='container'>
    //   <Sidebar/>
    //   <Body/>
    // </div>
  )
}

export default App