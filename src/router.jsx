import { createBrowserRouter } from 'react-router-dom'
import Calendario from './routes/Calendario'
import Home from './routes/Home'
import Pessoas from './routes/Pessoas'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/calendario', element: <Calendario /> },
  { path: '/pessoas', element: <Pessoas /> },
])

export default router
