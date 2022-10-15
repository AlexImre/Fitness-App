import './Home.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { AddActivity } from '../Components/AddActivity/AddActivity';
import { Header } from '../Components/Header/Header';
import { CalendarComponent } from '../Components/Calendar/CalendarComponent';

// ADD GENERATE DUMMY DATA OPTION FOR SHOWING OFF PROJECT?

export function Home(props) {
    // STATE VARIABLES
    const newEvent = props.newEvent;
    const setNewEvent = props.setNewEvent;
    const allEvents = props.allEvents;
    const setAllEvents = props.setAllEvents;
    const activityLog = props.activityLog;
    const setActivityLog = props.setActivityLog;
    const monthlyLog = props.monthlyLog;
    const setMonthlyLog = props.setMonthlyLog;

    // FUNCTIONS
    const [showAddActivityMenu, setShowAddActivityMenu] = useState(false);
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
        const activityMonth = newEvent.start.getMonth();
        const activity = newEvent.activity;
        const length = Number(newEvent.length);
        const newLengthEntry = activityLog[activity] += length;
        const prevMonthActivityLength = monthlyLog[activityMonth][activity];
        setActivityLog({...activityLog, [activity]: newLengthEntry });
        setMonthlyLog({...monthlyLog, [activityMonth]: {...monthlyLog[activityMonth], [activity]: prevMonthActivityLength + length }})
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
            const activityMonth = e.start.getMonth();
            const activity = e.activity;
            const prevMonthActivityLength = monthlyLog[activityMonth][activity];
            setMonthlyLog({...monthlyLog, [activityMonth]: {...monthlyLog[activityMonth], [activity]: prevMonthActivityLength - e.length }})
        }
    }

    return (
        <>
        {/* HEADER SECTION */}
        <Header toggleActivityMenu={toggleActivityMenu} toggleAddActivityButton={true} />

        {/* ADDACTIVITY SECTION */}
        <div className='AppAddActivityContainer'>
            {showAddActivityMenu ? <AddActivity newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} toggleActivityMenu={toggleActivityMenu} /> : '' }
        </div>

        {/* CALENDAR SECTION */}
        <CalendarComponent 
            newEvent={newEvent}
            allEvents={allEvents}
            handleEventSelection={handleEventSelection}
            />
        </>
    );
}