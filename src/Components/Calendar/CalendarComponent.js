import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export const CalendarComponent = (props) => {

  const allEvents = props.allEvents;

  return (
    <div className='CalendarContainer'>
    <Calendar 
      localizer={localizer}
      views={['month']}
      events={allEvents} 
      startAccessor="start" 
      endAccessor="end" 
      titleAccessor="activity"
      showAllEvents={true}
      allEvents
      enableAutoScroll={true}
      style={{height: 600, margin: 50}} 
      onSelectEvent={props.handleEventSelection}
    />
  </div>
  )
}