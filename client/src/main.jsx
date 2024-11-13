import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux' // import để sử dụng redex -file store trong redux
import store from './redux/store.js'   // lấy store
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<HomePage to='/home' />} />
        </Routes>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,

)

  

