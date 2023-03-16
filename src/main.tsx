import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './AppRoutes'
import './index.bundle.css'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Routes />
    </CookiesProvider>
  </React.StrictMode>,
)
