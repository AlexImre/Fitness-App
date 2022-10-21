import React from 'react'
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = (props) => {

    const toggleAddActivityButton = props.toggleAddActivityButton;
    const path = useLocation();

    return (
        <div className="HeaderTitleContainer">
            <div className='HeaderTitleLeft'>
                <div className='HeaderLogo'>
                    <i className="fa-solid fa-person-running"></i>
                    <span className='HeaderLogoTitle'>Fitr</span>
                </div>
                <span className='HeaderHomeTitle'>
                    <NavLink 
                        className="Link" 
                        to={'/Home'} 
                        style={path.pathname === '/' ? {textDecoration: 'underline #4ecdc4'} : {textDecoration: 'none'}}>Home
                    </NavLink>
                </span>
                <span className='HeaderAnalyticsTitle'>
                    <NavLink 
                        className="Link" 
                        to={'/Analytics'} 
                        style={path.pathname === '/Analytics' ? {textDecoration: 'underline #4ecdc4'} : {textDecoration: 'none'}}>Analytics
                    </NavLink>
                </span>
            </div>

            { toggleAddActivityButton? <div className='HeaderTitleRight'>
                <span className='HeaderActivity'>Activity</span>
                <button className='button-18' onClick={props.toggleActivityMenu}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div> : '' }
    </div>
    );
};