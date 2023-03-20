import 'bootstrap/dist/css/bootstrap.min.css?v=1'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './AppRoutes'
import './assets/index.bundle.css'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Routes />
      <ToastContainer />
    </CookiesProvider>
  </React.StrictMode>,
)
