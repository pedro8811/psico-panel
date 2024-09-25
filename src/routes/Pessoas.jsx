import { useState } from 'react'
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { FaEdit, FaEye, FaTrashAlt, FaUserPlus } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import '../assets/css/pessoas.css'

const DataTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 2,
      name: 'Jane',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 3,
      name: 'Bob',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
  ])

  const [modal, setModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isNewRegistration, setIsNewRegistration] = useState(false)

  const toggleModal = (item, editing = false) => {
    setSelectedData(item)
    setIsEditing(editing)
    setIsNewRegistration(false)
    setModal(!modal)
  }

  const toggleNewRegistrationModal = () => {
    setSelectedData({
      id: data.length + 1,
      name: '',
      datainicio: '',
      datafim: '',
      telefone: '',
    })
    setIsEditing(true)
    setIsNewRegistration(true)
    setModal(!modal)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedData({ ...selectedData, [name]: value })
  }

  const handleSave = () => {
    if (isNewRegistration) {
      setData([...data, selectedData])
    } else {
      const updatedData = data.map((item) => (item.id === selectedData.id ? selectedData : item))
      setData(updatedData)
    }
    setModal(false)
  }

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id)
    setData(updatedData)
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <Container className='pessoas'>
        <Row className='mt-4  justify-content-end'>
          <Col xs='auto'>
            <Button color='secondary' onClick={toggleNewRegistrationModal} className='float-end'>
              <FaUserPlus /> Novo Cadastro
            </Button>
          </Col>
        </Row>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Início de tratamento</th>
              <th>Fim de tratamento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope='row'>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.datainicio}</td>
                <td>{item.datafim}</td>
                <td>
                  <Row>
                    <Col className='text-end'>
                      <Button
                        className='ms-1'
                        color='secondary'
                        size='sm'
                        onClick={() => toggleModal(item, true)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        className='ms-1'
                        color='danger'
                        size='sm'
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                      <Button
                        className='ms-1'
                        color='secondary'
                        size='sm'
                        onClick={() => toggleModal(item)}
                      >
                        <FaEye />
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {isNewRegistration
            ? 'Novo Cadastro'
            : `Paciente ${selectedData ? selectedData.name : ''}`}
        </ModalHeader>
        <ModalBody>
          {selectedData && (
            <Form className='cadastro-pessoa'>
              <FormGroup>
                <Label for='id'>ID</Label>
                <Input name='id' disabled value={selectedData.id} />
              </FormGroup>
              <FormGroup>
                <Label for='name'>Nome</Label>
                <Input
                  name='name'
                  value={selectedData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              <FormGroup>
                <Label for='datainicio'>Data Início</Label>
                <Input
                  name='datainicio'
                  value={selectedData.datainicio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              <FormGroup>
                <Label for='datafim'>Data Fim</Label>
                <Input
                  name='datafim'
                  value={selectedData.datafim}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
              <FormGroup>
                <Label for='telefone'>Contato</Label>
                <Input
                  name='telefone'
                  value={selectedData.telefone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <Button color='primary' onClick={handleSave}>
              Salvar
            </Button>
          ) : (
            <Button color='secondary' onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
          <Button color='secondary' onClick={() => setModal(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DataTable
