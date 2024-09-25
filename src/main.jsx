import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='d-flex'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
)
