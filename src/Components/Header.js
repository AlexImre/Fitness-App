import React from 'react'
import './Header.css';

export const Header = (props) => {
  return (
    <div className="HeaderTitleContainer">
        <div className='HeaderTitleLeft'>
            <div className='HeaderLogo'>
                <i className="fa-solid fa-person-running"></i>
                <span className='HeaderLogoTitle'>Fitr</span>
            </div>
            <span className='HeaderHomeTitle'>Home</span>
            <span className='HeaderAnalyticsTitle'>Analytics</span>
        </div>

        <div className='HeaderTitleRight'>
            <h3>Activity</h3>
            <button className='button-18' onClick={props.toggleActivityMenu}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
  </div>
  );
};