import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home.js";
import { Analytics } from "./Pages/Analytics.js";
import { Register } from "./Pages/Register.js";
import { LoginPage } from "./Pages/LoginPage.js";
import { useNavigate, useLocation } from "react-router-dom";

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


  // check auth before every page load, unless location is /login or /register
  const checkAuth = async () => {
    if (location.pathname === '/register' || location.pathname === '/Register' || location.pathname === '/login' || location.pathname === '/Login'){
      return;
    }
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
  const location = useLocation();
  const handleAuth = (res) => {
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

  
  useEffect(() => {
    getAllEvents();
  }, []);

  // Get allEvents

  const handleAddAllEvents = (res) => {
    console.log('reached handleallevents!');
    const userAllEvents = res.allEvents;
    // add all events from database to state on page load
    setAllEvents(
      allEvents.concat(userAllEvents)
    );
  }

  const getAllEvents = async () => {
    console.log('You are loading GET allEvents!');
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  }
  try {
    console.log('You are fetching GET allEvents!');
    await fetch('/allEvents', requestOptions)
      .then(res => res.json())
      .then(res => handleAddAllEvents(res));
  } catch (err) {
    console.log('You hit all events error!');
    console.log(err);
  }
}

const date = new Date("2022-10-11T23:00:00.000Z");
console.log(date.getFullYear());


  // IS LOADING CAN BE MOVED TO HOME AND ANALYTICS PAGE?

  return (
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/Login" element={ <LoginPage setIsLoading={setIsLoading} /> } />
        <Route path="/Register" element={ <Register /> } />
        <Route path="/Home" element={
          <Home 
            newEvent={newEvent} setNewEvent={setNewEvent}
            allEvents={allEvents} setAllEvents={setAllEvents}
            activityLog={activityLog} setActivityLog={setActivityLog}
            monthlyLog={monthlyLog} setMonthlyLog={setMonthlyLog} /> } />
        <Route path="/Analytics" element={
          <Analytics 
            allEvents={allEvents}
            activityLog={activityLog}
            monthlyLog={monthlyLog}
            setAllEvents={setAllEvents} />
        } />
      </Routes>
    );
};

export default App;
