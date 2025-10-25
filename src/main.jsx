import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserDataProvider } from './context/UserContext.jsx'
import { CaptainDataProvider } from './context/CaptainContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CaptainDataProvider>
      <UserDataProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserDataProvider>
    </CaptainDataProvider>
  </React.StrictMode>,
)