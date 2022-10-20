import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home.js";
import { Analytics } from "./Pages/Analytics.js";
import { Register } from "./Pages/Register.js";
import { Login } from "./Pages/Login.js";

function App() {

  const [newEvent, setNewEvent] = useState({activity: '', start: '', end: '', length: 0});
  const [allEvents, setAllEvents] = useState([]);
  const [activityLog, setActivityLog] = useState({Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0});
  const [monthlyLog, setMonthlyLog] = useState({ 
      0: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      1: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      2: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      3: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      4: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      5: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      6: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      7: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      8: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      9: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      10: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 },
      11: { Run: 0, Cycle: 0, Gym: 0, Row: 0, Yoga: 0, Other: 0 }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Register /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/Home" element={
          <Home 
            newEvent={newEvent} setNewEvent={setNewEvent}
            allEvents={allEvents} setAllEvents={setAllEvents}
            activityLog={activityLog} setActivityLog={setActivityLog}
            monthlyLog={monthlyLog} setMonthlyLog={setMonthlyLog} />
        } />
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
