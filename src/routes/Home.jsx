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
        <h1>Bem vindo ao PsicoPanel!</h1>
        <h2 className='title'>Atalhos</h2>
        <div className='row'>
          <div className='col-2 card-atalho'>
            <div onClick={() => handleNavigate('/calendario')} className=''>
              <FaCalendar className='fs-2 mb-2' /> Calendário
            </div>
          </div>
          <div className='col-2 card-atalho'>
            <div onClick={() => handleNavigate('/pessoas')} className=''>
              <FaUser className='fs-2 mb-2' /> Pessoas
            </div>
          </div>
        </div>
        <h2 className='title'>Estatísticas</h2>
        <div className='row gx-2'>
          <div className='col-2'>
            <div className='card-estatistica'>
              <h3>3</h3>
              <p>Pacientes</p>
            </div>
          </div>
          <div className='col-2'>
            <div className='card-estatistica'>
              <h3>4</h3>
              <p>Sessões no dia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
