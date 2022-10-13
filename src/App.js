import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { AddActivity } from './Components/AddActivity';
import { ActivityTimeChart } from './Components/ActivityTimeChart';
import { Header } from './Components/Header';
import { TotalTimeChart } from './Components/MonthlyTimeChart';

// ADD GENERATE DUMMY DATA OPTION FOR SHOWING OFF PROJECT?

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
  const [monthlyLog, setMonthlyLog] = useState({ 
      0: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      1: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      2: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      3: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      4: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      5: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      6: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      7: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      8: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      9: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      10: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 },
      11: { Running: 0, Cycling: 0, Gym: 0, Rowing: 0 }
  }
  )

  console.log(`monthlyLog 9 is: ${monthlyLog[9]}`)

  // FUNCTIONS
  const toggleActivityMenu = () => {
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
    const activityMonth = newEvent.start.getMonth();
    const activity = newEvent.activity;
    const length = Number(newEvent.length);
    const newLengthEntry = activityLog[activity] += length;
    // const newMonthLength = monthlyLog[activityMonth][activity] += length;
    // const newMonthlyEntry = monthlyLog[activityMonth][activity] += length;
    // const newMonthlyEntry = monthlyLog[activityMonth][activity]; += length;
    setActivityLog({...activityLog, [activity]: newLengthEntry });
    // setMonthlyLog({...monthlyLog, [monthlyLog[activityMonth].activity]: newMonthlyEntry })
    // THIS UPDATES THE ACTIVITY WITHIN THE SPECIFIC MONTH -- BRACKET NOTATION MUST BE USED WHEN ACCESSING OBJECT PROPERTIES USING VARIABLES
    setMonthlyLog({...monthlyLog, [activityMonth]: {...monthlyLog[activityMonth], [activity]: monthlyLog[activityMonth][activity] + length } })
    console.log(monthlyLog);
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
    {/* HEADER SECTION */}
    <Header toggleActivityMenu={toggleActivityMenu} />

    {/* ADD ACTIVITY SECTION */}
    <div className='AppAddActivityContainer'>
      {showAddActivityMenu ? <AddActivity newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} toggleActivityMenu={toggleActivityMenu} /> : '' }
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
        <span>Activity Log</span>
        {/* Total time spent exercising, across logged activities:
        <ul>
          {activityLog.Running > 0? <li>Running: {activityLog.Running} minutes</li> : '' }
          {activityLog.Cycling > 0? <li>Cycling: {activityLog.Cycling} minutes</li> : '' }
          {activityLog.Gym > 0? <li>Gym: {activityLog.Gym} minutes</li> : '' }
          {activityLog.Rowing > 0? <li>Rowing: {activityLog.Rowing} minutes</li> : '' }
        </ul> */}


    </div>
    <div className='AppChartContainer'>
      <ActivityTimeChart activityLog={activityLog} />
      <TotalTimeChart activityLog={activityLog} allEvents={allEvents} monthlyLog={monthlyLog}/>
    </div>
    </>
  );
}

export default App;
