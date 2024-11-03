// App.js
import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar Section/Sidebar';
import Body from './Components/Body Section/Body';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

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
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
