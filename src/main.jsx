import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import toast, { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contextApi/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Toaster />
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
