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
  const [activityLog, setActivityLog] = useState({Running: 0, Cycling: 0, Gym: 0, Rowing: 0});

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
    if(newEvent.activity){
    
    setAllEvents([...allEvents, newEvent]);
    // Can use start to log by month if needed
    const start = newEvent.start;
    const activity = newEvent.activity;
    const length = Number(newEvent.length);
    const newLengthEntry = activityLog[activity] += length;
    setActivityLog({...activityLog, [activity]: newLengthEntry });
    }
    else {
      window.alert('Please select valid activity');
    }
  }

  // DELETE ACTIVITY
  const handleEventSelection = (e) => {
    const request = window.confirm("Would you like to remove this activity?")
    if (request) {
      const idx = allEvents.indexOf(e);
      // I THINK SPLICING LIKE THIS MAY BE INCORRECT (but works??). DO I NEED TO USE setAllEvents to remove ID from state???
      allEvents.splice(idx, 1);
      setActivityLog({ ...activityLog, [e.activity]: activityLog[e.activity] - e.length });
    }
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
        onSelectEvent={handleEventSelection}
      />
    </div>

    {/* ACTIVITY LOG SECTION */}
    {/* NOTE TO CONVERT TO COMPONENT */}
    {/* NOTE TO ADD DIFFERENT VIEWS FOR CHARTS E.G ACTIVITY TIME PER MONTH / ACTIVITY TIME PER ACTIVITY */}
    <div className="AppActivityLogContainer">
        <h2>Activity Log</h2>
        {/* Total time spent exercising, across logged activities:
        <ul>
          {activityLog.Running > 0? <li>Running: {activityLog.Running} minutes</li> : '' }
          {activityLog.Cycling > 0? <li>Cycling: {activityLog.Cycling} minutes</li> : '' }
          {activityLog.Gym > 0? <li>Gym: {activityLog.Gym} minutes</li> : '' }
          {activityLog.Rowing > 0? <li>Rowing: {activityLog.Rowing} minutes</li> : '' }
        </ul> */}


    </div>
    <div className='AppChartContainer'>
      <ChartComponent activityLog={activityLog} />
    </div>
    </>
  );
}

export default App;
