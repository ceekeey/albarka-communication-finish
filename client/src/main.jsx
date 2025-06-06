import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
