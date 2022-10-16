import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddActivity.css';

export const AddActivity = (props) => {

  // PROPS
  const newEvent = props.newEvent;
  const setNewEvent = (event) => {
    props.setNewEvent(event);
  }
  const handleAddEvent = () => {
    props.handleAddEvent();
    props.toggleActivityMenu();
  }
  const toggleActivityMenu = () => {
    props.toggleActivityMenu();
  }



  return (
      <div className='AddActivityContainer'>
        <div className='AddActivityWrapper'>
          <div className='AddActivitySelectWrapper'>
              <span className='AddActivityLabel'>Activity</span>
              <div>
              <select className='AddActivitySelect' id="Activities" name="Activities" onChange={(e) => setNewEvent({...newEvent, activity: e.target.value})}>
                <option value=''></option>
                <option value='Cycle'>Cycle</option>
                <option value='Gym'>Gym</option>
                <option value='Row'>Row</option>
                <option value='Run'>Run</option>
                <option value='Yoga'>Yoga</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>

          <div className='AddActivityDateWrapper'>
              <span className='AddActivityLabel'>Date</span>
              <div className='AddActivityDatePicker'>
                <DatePicker placeholderText="Date of activity" selected={newEvent.start} popperPlacement='bottom'
                  onChange={(start) => setNewEvent({...newEvent, start: start, end: start + 1})}
                />
            </div>
          </div>

          <div className='AddActivityLengthWrapper'>
              <span className='AddActivityLabel'>Length (mins)</span>
              <div className='AddActivityLength'>
                <input type="number" className='AddActivityInput' placeholder="Length of activity (mins)" value={Number(newEvent.length)}
                  onChange={(e) => setNewEvent({...newEvent, length: Number(e.target.value)})}
                />
              </div>
          </div>

          <div className='AddActivityButtons'>
            <button className='AddActivityAddButton button-41' onClick={handleAddEvent}>
              Add
            </button>
            <button className='AddActivityCloseButton button-41Close' onClick={toggleActivityMenu}>
              Close
            </button>
          </div>
        </div>
      </div>
  )
}