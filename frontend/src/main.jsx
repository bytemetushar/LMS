// component imports 
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './Redux/store.js'

// CSS imports
import './index.css'
import ReactDOM from 'react-dom/client'
import {BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* <Toaster></Toaster> */}
    </BrowserRouter>
  </Provider>,
)
