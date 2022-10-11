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
  }
  const ToggleActivityMenu = () => {
    props.ToggleActivityMenu();
  }



  return (
    <div className='AddActivityContainer'>
  
      <div className='AddActivitySelectWrapper'>
          Select Activity
          <div>
          <select className='AddActivitySelect' id="Activities" name="Activities" onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}>
            <option value='running'>Running</option>
            <option value='cycling'>Cycling</option>
            <option value='gym'>Gym</option>
            <option value='rowing'>Rowing</option>
            <option value='other'>Other</option>
          </select>
        </div>
      </div>

      <div className='AddActivityDateWrapper'>
          Select Date of Activity
          <div className='AddActivityDatePicker'>
            <DatePicker placeholderText="Date of activity" selected={newEvent.start} popperPlacement='bottom'
              onChange={(start) => setNewEvent({...newEvent, start: start, end: start + 1})}
            />
        </div>
      </div>

      <div className='AddActivityLengthWrapper'>
          Length of Activity
          <div className='AddActivityLength'>
            <input type="number" placeholder="Length of activity (mins)" value={newEvent.length}
              onChange={(e) => setNewEvent({...newEvent, length: e.target.value})}
            />
          </div>
      </div>

      <div className='AddActivityButtons'>
        <button className='AddActivityAddButton button-41' onClick={handleAddEvent}>
          Add
        </button>
        <button className='AddActivityCloseButton button-41Close' onClick={ToggleActivityMenu}>
          Close
        </button>
      </div>


      </div>
  )
}