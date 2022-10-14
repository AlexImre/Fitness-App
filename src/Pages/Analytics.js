import React, { useState } from 'react'
import { Header } from '../Components/Header/Header';
import { ActivityTimeChart } from '../Components/Charts/ActivityTimeChart';
import { TotalTimeChart } from '../Components/Charts/MonthlyTimeChart';

export const Analytics = (props) => {
    // GET STATE DATA
    const allEvents = props.allEvents;
    const activityLog = props.activityLog;
    const monthlyLog = props.monthlyLog;

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

    const [toggleChartView, setToggleChartView] = useState(false);
    const toggleView = (boolean) => {
        setToggleChartView(boolean);
    };

    return (
        <>
        <Header toggleActivityMenu={toggleActivityMenu} toggleAddActivityButton={false} />
        
        <div className="AppActivityLogContainer">
            <span>Activity Log</span>
            <br></br>
            <button className='AppYearlyView' onClick={() => toggleView(true)}>Yearly</button>
            <button className='AppMonthlyView' onClick={() => toggleView(false)}>Monthly</button>
        </div>
        <div className='AppChartContainer'>
            {toggleChartView ? <ActivityTimeChart activityLog={activityLog}  /> : <TotalTimeChart activityLog={activityLog} allEvents={allEvents} monthlyLog={monthlyLog}/>}
        </div>
        </>
    )
}