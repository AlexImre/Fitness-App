import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home.js";
import { Analytics } from "./Pages/Analytics.js";

function App() {

  const [newEvent, setNewEvent] = useState({activity: '', start: '', end: '', length: 0});
  const [allEvents, setAllEvents] = useState([]);
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
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home 
            newEvent={newEvent} setNewEvent={setNewEvent}
            allEvents={allEvents} setAllEvents={setAllEvents}
            activityLog={activityLog} setActivityLog={setActivityLog}
            monthlyLog={monthlyLog} setMonthlyLog={setMonthlyLog} />
        } />
      </Routes>
      <Routes>
      <Route path="/Analytics" element={
        <Analytics 
          allEvents={allEvents}
          activityLog={activityLog}
          monthlyLog={monthlyLog} />
      } />
      </Routes>
    </Router>
    );
};

export default App;
