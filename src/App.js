import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const events = [
  {
    title: 'big meeting',
    allDay: false,
    start: new Date(2022, 9, 13),
    end: new Date(2022, 9, 15)
  },
  {
    title: 'vacation',
    start: new Date(2022, 10, 26),
    end: new Date(2022, 10, 27)
  },
  {
    title: 'conference',
    start: new Date(2022, 9, 10),
    end: new Date(2022, 9, 12)
  },
  {
    title: 'run',
    start: new Date(2022, 9, 26),
    end: new Date(2022, 9, 27)
  }
]

function App() {

  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''});
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <>
    <div className="AppTitle">
      <h1>Fitr</h1>
    </div>
    <div className="AppAddEventTitle">
      <h2>Add Activity</h2>
    </div>

    <div className='DatePickerContainer'>
      <input 
        type="text" 
        placeholder="Add Activity" 
        value={newEvent.title}
        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
      />

      <div className='DatePicker1'>
        <DatePicker 
          placeholderText="start Date" 
          selected={newEvent.start}
          onChange={(start) => setNewEvent({...newEvent, start: start, end: start + 1})}
          popperPlacement='bottom'
        />
      </div>

      {/* <div className='DatePicker2'>
        <DatePicker 
          placeholderText="End Date" 
          style={{marginRight: '50px'}}
          selected={newEvent.end} 
          popperPlacement='bottom'
          onChange={(end) => setNewEvent({...newEvent, end})}
        />
      </div> */}
      
      <button onClick={handleAddEvent}>
        +
      </button>
      </div>
    
    <div className='Calendarcontainer'>
      <Calendar 
        localizer={localizer} 
        events={allEvents} 
          startAccessor="start" 
          endAccessor="end" 
          style={{height: 500, margin: 50}} 
      />
    </div>
    </>
  );
}

export default App;
