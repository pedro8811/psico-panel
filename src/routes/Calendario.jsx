import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import '../assets/css/calendario.css'
import Sidebar from '../components/Sidebar'

const CalendarApp = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'All Day Event', start: new Date(new Date().setDate(1)) },
    {
      id: 2,
      title: 'Repeating Event',
      start: new Date(new Date().setDate(new Date().getDate() - 3)),
      className: 'info',
    },
    {
      id: 3,
      title: 'Repeating Event',
      start: new Date(new Date().setDate(new Date().getDate() + 4)),
      className: 'info',
    },
    {
      id: 4,
      title: 'Meeting',
      start: new Date(new Date().setHours(10, 30)),
      className: 'important',
    },
    {
      id: 5,
      title: 'Lunch',
      start: new Date(new Date().setHours(12, 0)),
      end: new Date(new Date().setHours(14, 0)),
      className: 'important',
    },
    {
      id: 6,
      title: 'Birthday Party',
      start: new Date(new Date().setDate(new Date().getDate() + 1), new Date().setHours(19, 0)),
      end: new Date(new Date().setDate(new Date().getDate() + 1), new Date().setHours(22, 30)),
    },
  ])

  const [modal, setModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    date: '',
    startTime: '',
    endTime: '',
  })

  const toggle = () => setModal(!modal)

  const handleDateSelect = (selectInfo) => {
    const selectedDate = new Date(selectInfo.start)
    setNewEvent({
      id: null,
      title: '',
      date: selectedDate.toISOString().split('T')[0],
      startTime: '',
      endTime: '',
    })
    toggle()
  }

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    const start = new Date(event.start)
    const end = event.end ? new Date(event.end) : null

    setNewEvent({
      id: event.id,
      title: event.title,
      date: start.toISOString().split('T')[0],
      startTime: formatTime(start),
      endTime: end ? formatTime(end) : '',
    })
    toggle()
  }

  const handleEventDrop = (eventInfo) => {
    const updatedEvents = events.map((event) => {
      if (event.id === parseInt(eventInfo.event.id)) {
        return {
          ...event,
          title: eventInfo.event.title,
          start: eventInfo.event.start,
          end: eventInfo.event.end,
        }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.startTime) {
      const start = new Date(`${newEvent.date}T${newEvent.startTime}`)
      const end = newEvent.endTime ? new Date(`${newEvent.date}T${newEvent.endTime}`) : null

      if (newEvent.id) {
        // Update existing event
        setEvents(
          events.map((event) =>
            event.id === parseInt(newEvent.id)
              ? { ...event, title: newEvent.title, start, end }
              : event
          )
        )
      } else {
        // Create new event
        const newId = Math.max(...events.map((e) => e.id)) + 1
        setEvents([...events, { id: newId, title: newEvent.title, start, end }])
      }
      toggle()
    }
  }

  const handleDeleteEvent = () => {
    if (newEvent.id) {
      setEvents(events.filter((event) => event.id !== parseInt(newEvent.id)))
      toggle()
    }
  }

  // Helper function to format time in 24-hour format
  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5)
  }

  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className='wrap'>
          <div className='calendar'>
            <FullCalendar
              locale={'pt-br'}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridDay',
              }}
              buttonIcons={{
                prev: 'chevron-left',
                next: 'chevron-right',
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              events={events}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {newEvent.id ? 'Editar agendamento' : 'Criar agendamento'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='eventTitle'>Título</Label>
              <Input
                type='text'
                name='title'
                id='eventTitle'
                placeholder='Digite o título do agendamento'
                value={newEvent.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='eventStartTime'>Hora de início (formato 24h)</Label>
              <Input
                type='time'
                name='startTime'
                id='eventStartTime'
                value={newEvent.startTime}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='eventEndTime'>Hora de término (formato 24h)</Label>
              <Input
                type='time'
                name='endTime'
                id='eventEndTime'
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            {newEvent.id ? 'Atualizar' : 'Criar'} Agendamento
          </Button>{' '}
          {newEvent.id && (
            <Button color='danger' onClick={handleDeleteEvent}>
              Excluir
            </Button>
          )}
          <Button color='secondary' onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CalendarApp
