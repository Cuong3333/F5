import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux' // import để sử dụng redex -file store trong redux
import store from './redux/store.js'   // lấy store

import './index.css'
import App from './App.jsx'


//sử dụng Provider, nó nhận vào một prop là store, tức là Redux Store của bạn, và nó sẽ đưa Redux Store vào ngữ cảnh (context) của ứng dụng. Điều này giúp các component có thể truy cập store thông qua hook useSelector hoặc dispatch action thông qua useDispatch.
//Sau khi bạn bọc ứng dụng của mình với Provider, các component trong ứng dụng có thể truy cập Redux store để lấy dữ liệu hoặc dispatch các hành động.
//Component sử dụng useSelector sẽ truy xuất trạng thái từ store, còn component sử dụng useDispatch sẽ gửi các action đến store.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
