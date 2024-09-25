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
} from 'reactstrap'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import '../assets/css/pessoas.css'
import { useState } from 'react'

const DataTable = ({
  data = [
    {
      id: 1,
      name: 'John Doe',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 2,
      name: 'Jane Smith',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 4,
      name: 'John Doe',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 5,
      name: 'Jane Smith',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
    {
      id: 6,
      name: 'Bob Johnson',
      datainicio: '24/09/2024',
      datafim: '24/09/2024',
      telefone: '(34) 99900-9900',
    },
  ],
}) => {
  const [modal, setModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const toggleModal = (item) => {
    setSelectedData(item)
    setModal(!modal)
  }
  return (
    <div className='d-flex'>
      <Sidebar />
      <Container className='pessoas'>
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
            {data.map((item, index) => (
              <tr key={index}>
                <th scope='row'>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.datainicio}</td>
                <td>{item.datafim}</td>
                <td>
                  <Row>
                    <Col className='text-end'>
                      {/* <Button className='ms-1' color='secondary' size='sm'>
                        <FaEdit />
                      </Button> */}
                      <Button className='ms-1' color='danger' size='sm'>
                        <FaTrashAlt />
                      </Button>
                      <Button
                        className='ms-1'
                        color='secondary'
                        size='sm'
                        onClick={() => toggleModal(item)}
                        type='button'
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModal'
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

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Paciente {selectedData ? selectedData.name : 'Modal Title'}
        </ModalHeader>
        <ModalBody>
          {selectedData && (
            <div className='cadastro-pessoa'>
              <label htmlFor='id'>ID</label>
              <input name='id' disabled value={selectedData.id} />
              <label htmlFor='name'>Nome</label>
              <input name='name' disabled value={selectedData.name} />
              <label htmlFor='dtinicio'>Data Início: </label>
              <input name='dtinicio' disabled value={selectedData.datainicio} />
              <label htmlFor='dtfinal'>Data Fim:</label>
              <input name='dtfinal' disabled value={selectedData.datafim} />
              <label htmlFor='telefone'>Contato</label>
              <input name='telefone' disabled value={selectedData.telefone} />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggleModal}>
            Close
          </Button>
          {/* <Button color='primary'>Save changes</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DataTable
