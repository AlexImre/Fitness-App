import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { AddActivity } from './Components/AddActivity';
import { ChartComponent } from './Components/Chart';

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

function App() {
  // INITIALISE STATE
  const [newEvent, setNewEvent] = useState({activity: '', start: '', end: '', length: 0});
  const [allEvents, setAllEvents] = useState([]);
  const [showAddActivityMenu, setShowAddActivityMenu] = useState(false);
  const [activityLog, setActivityLog] = useState({running: 0, cycling: 0, gym: 0, rowing: 0});

  // FUNCTIONS
  const ToggleActivityMenu = () => {
    if(showAddActivityMenu) {
      setShowAddActivityMenu(false);
      return;
    } else {
      setShowAddActivityMenu(true);
    }
  };

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    // Can use start to log by month if needed
    const start = newEvent.start;
    const activity = newEvent.activity;
    const length = Number(newEvent.length);
    const newLengthEntry = activityLog[activity] += length;
    setActivityLog({...activityLog, [activity]: newLengthEntry });
  }

  return (
    <>
    {/* TITLE SECTION */}
    <div className="AppTitleContainer">
      <div className='AppTitleLeft'>
        <i className="fa-solid fa-person-running"></i>
        <h1>Fitr</h1>
      </div>
      <div className='AppTitleRight'>
        <h3>Add Activity</h3>
        <button className='button-18' onClick={ToggleActivityMenu}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>

    {/* ADD ACTIVITY SECTION */}
    <div className='AppAddActivityContainer'>
      {showAddActivityMenu ? <AddActivity newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} ToggleActivityMenu={ToggleActivityMenu} /> : '' }
    </div>

    {/* CALENDAR SECTION */}
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
        style={{height: 500, margin: 50}} 
      />
    </div>

    {/* ACTIVITY LOG SECTION */}
    {/* CONVERT TO COMPONENT */}
    <div className="AppActivityLogContainer">
      <h2>Activity Log</h2>
      Total time spent exercising, across logged activities:
      <ul>
        {activityLog.running > 0? <li>Running: {activityLog.running} minutes</li> : '' }
        {activityLog.cycling > 0? <li>Cycling: {activityLog.cycling} minutes</li> : '' }
        {activityLog.gym > 0? <li>Gym: {activityLog.gym} minutes</li> : '' }
        {activityLog.rowing > 0? <li>Rowing: {activityLog.rowing} minutes</li> : '' }
      </ul>
    </div>
    <ChartComponent />
    </>
  );
}

export default App;
