import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import '../assets/css/calendario.css'
import Sidebar from '../components/Sidebar'

const CalendarApp = () => {
  const [events, setEvents] = useState([
    { title: 'All Day Event', start: new Date(new Date().setDate(1)) },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(new Date().setDate(new Date().getDate() - 3)),
      className: 'info',
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(new Date().setDate(new Date().getDate() + 4)),
      className: 'info',
    },
    { title: 'Meeting', start: new Date(new Date().setHours(10, 30)), className: 'important' },
    {
      title: 'Lunch',
      start: new Date(new Date().setHours(12, 0)),
      end: new Date(new Date().setHours(14, 0)),
      className: 'important',
    },
    {
      title: 'Birthday Party',
      start: new Date(new Date().setDate(new Date().getDate() + 1), new Date().setHours(19, 0)),
      end: new Date(new Date().setDate(new Date().getDate() + 1), new Date().setHours(22, 30)),
    },
  ])

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Event Title:')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      setEvents([
        ...events,
        { title, start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay },
      ])
    }
  }

  const handleEventDrop = (eventInfo) => {
    const updatedEvents = events.map((event) => {
      if (event.title === eventInfo.event.title) {
        return { ...event, start: eventInfo.event.startStr }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className='wrap'>
          <div className='calendar'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              droppable={true}
              events={events}
              select={handleDateSelect}
              eventDrop={handleEventDrop}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarApp
