import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import { FaBrain, FaHome, FaCalendar, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../assets/css/sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()

  const handleNavigate = (route) => {
    navigate(route)
  }

  return (
    <Navbar
      className='bg-dark text-white flex-column align-items-start'
      fixed='left'
      style={{ width: '200px', height: '930px' }}
    >
      <NavLink onClick={() => handleNavigate('/')} className='m-2 d-flex align-items-center'>
        <FaBrain className='fs-2 me-2 mb-1' />
        <h1 className='fs-3'>PsicoPanel</h1>
      </NavLink>
      <Nav vertical className='w-100 links'>
        <NavItem>
          <NavLink style={{ cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
            <FaHome className='me-2' />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleNavigate('/calendario')}>
            <FaCalendar className='me-2' />
            Calendário
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleNavigate('/pessoas')}>
            <FaUser className='me-2' />
            Pacientes
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Sidebar
