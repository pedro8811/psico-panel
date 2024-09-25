import { Container } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { FaCalendar, FaUser } from 'react-icons/fa'
import '../assets/css/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = (route) => {
    navigate(route)
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='home'>
        <div className='row'>
          <h1 className='mb-4'>Bem vindo ao PsicoPanel!</h1>
          <div className='col-3'>
            <div onClick={() => handleNavigate('/calendario')} className='card'>
              <FaCalendar /> Calendário
            </div>
          </div>
          <div className='col-3'>
            <div onClick={() => handleNavigate('/pessoas')} className='card'>
              <FaUser /> Pessoas
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
