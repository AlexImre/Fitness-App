import './Home.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { AddActivity } from '../Components/AddActivity/AddActivity';
import { Header } from '../Components/Header/Header';
import { CalendarComponent } from '../Components/Calendar/CalendarComponent';
import { Footer } from '../Components/Footer/Footer';

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
        if (newEvent.length === 0 || newEvent.length > 500) {
            window.alert('Please enter valid length of activity.');
            return;
        }

        if(!newEvent.activity) {
            window.alert('Please select valid activity.');
            return;
        }

        setAllEvents([...allEvents, newEvent]);
        const activityMonth = newEvent.start.getMonth();
        const activity = newEvent.activity;
        const length = Number(newEvent.length);
        const newLengthEntry = activityLog[activity] += length;
        const prevMonthActivityLength = monthlyLog[activityMonth][activity];
        setActivityLog({...activityLog, [activity]: newLengthEntry });
        setMonthlyLog({...monthlyLog, [activityMonth]: {...monthlyLog[activityMonth], [activity]: prevMonthActivityLength + length }})
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
        <div 
            className='HomeContainer' 
            id='blur'
            style={showAddActivityMenu ? {
                    filter: 'blur(5px)', 
                    PointerEvents: 'none', 
                    userSelect: 'none'} : {filter: 'none'}}>
            <div className='HomeWrapper'>
                {/* HEADER SECTION */}
                <Header toggleActivityMenu={toggleActivityMenu} toggleAddActivityButton={true} />

                {/* CALENDAR SECTION */}
                <CalendarComponent 
                    newEvent={newEvent}
                    allEvents={allEvents}
                    handleEventSelection={handleEventSelection} />
            </div>

            {/* FOOTER SECTION */}
            <Footer />
        </div>

        {/* ADDACTIVITY SECTION */}
        <div className='AppAddActivityContainer'>
            {showAddActivityMenu ? <AddActivity newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} toggleActivityMenu={toggleActivityMenu} /> : '' }
        </div>
        </>
    );
}