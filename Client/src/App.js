import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home.js";
import { Analytics } from "./Pages/Analytics.js";
import { Register } from "./Pages/Register.js";
import { LoginPage } from "./Pages/LoginPage.js";
import { useNavigate } from "react-router-dom";

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

  const checkAuth = async () => {
    console.log('You are checking auth!');
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    try {
      await fetch('/auth', requestOptions)
        .then((res) => handleAuth(res))
    } catch (err) {
      console.log(err);
    }
  }

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleAuth = (res) => {
      console.log(res);
      if (res.status === 401) {
        console.log('RENAVIGATING TO LOGIN');
        navigate('/Login')
        return;
      }
      console.log(`isLoading is: ${isLoading}`);
      setIsLoading(false);
      console.log(`isLoading is: ${isLoading}`);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/Login" element={ <LoginPage setIsLoading={setIsLoading} /> } />
        <Route path="/Register" element={ <Register /> } />
        <Route path="/Home" element={ isLoading? '' :
          <Home 
            newEvent={newEvent} setNewEvent={setNewEvent}
            allEvents={allEvents} setAllEvents={setAllEvents}
            activityLog={activityLog} setActivityLog={setActivityLog}
            monthlyLog={monthlyLog} setMonthlyLog={setMonthlyLog} /> } />
        <Route path="/Analytics" element={ isLoading? '' :
          <Analytics 
            allEvents={allEvents}
            activityLog={activityLog}
            monthlyLog={monthlyLog} />
        } />
      </Routes>
    );
};

export default App;
