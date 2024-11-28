import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import EstimateRideProvider from './context/EstimateRideProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <EstimateRideProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </EstimateRideProvider>
  </BrowserRouter>
)
