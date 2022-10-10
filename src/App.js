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

// FOR CHANGING EVENT COLOURS https://stackoverflow.com/questions/34587067/change-color-of-react-big-calendar-events
// ACCORDION https://www.youtube.com/watch?v=fNKbo0bboyA&ab_channel=BrianDesign

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

]

function App() {

  const [newEvent, setNewEvent] = useState({title: '', start: '', end: '', length: ''});
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  }

  // Activity log needs to be in state (for re-rendering), or could useEffect? and needs to be fired from submit button
  // Monthly cells can only show 2 activities, can we change?
  
  const getActivityLog = (activity) => {
    let sum = 0;
    console.log(allEvents);
    for (let i = 0; i < allEvents.length; i++) {
      if(allEvents[i].title = activity){
        sum += Number(allEvents[i].length);
      }
      return sum;
    }
  }

  return (
    <>
    <div className='UltimateContainer'>

    
    <div className="AppTitleContainer">
      <div className='AppTitleLeft'>
        <i class="fa-solid fa-person-running"></i>
        <h1>Fitr</h1>
      </div>
      <div className='AppTitleRight'>
        <h3>Add Activity</h3>
        <button className='button-18'>
          +
        </button>
      </div>

    </div>
    <div className="AppAddEventTitle">
      <h2>Add Activity</h2>
    </div>

    <div className='DatePickerContainer'>
      <input 
        type="text" 
        placeholder="Add activity" 
        value={newEvent.title}
        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
      />

      <div className='DatePicker1'>
        <DatePicker 
          placeholderText="Date of activity" 
          selected={newEvent.start}
          onChange={(start) => setNewEvent({...newEvent, start: start, end: start + 1})}
          popperPlacement='bottom'
        />
      </div>

      <input 
        type="number" 
        placeholder="Length of activity (mins)" 
        value={newEvent.length}
        onChange={(e) => setNewEvent({...newEvent, length: e.target.value})}
      />
      
      <button onClick={handleAddEvent}>
        +
      </button>
      </div>
    
    <div className='CalendarContainer'>
      <Calendar 
        localizer={localizer}
        views={['month']}
        events={allEvents} 
        startAccessor="start" 
        endAccessor="end" 
        showAllEvents={true}
        allEvents
        style={{height: 500, margin: 50}} 
      />
    </div>

    <div className="AppActivityLogContainer">
      <h2>Activity Log</h2>
      <p>{getActivityLog('run')}</p>
    </div>
    </div>
    </>
  );
}

export default App;
