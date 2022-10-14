import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';

export const Header = (props) => {

    const toggleAddActivityButton = props.toggleAddActivityButton;

    return (
        <div className="HeaderTitleContainer">
            <div className='HeaderTitleLeft'>
                <div className='HeaderLogo'>
                    <i className="fa-solid fa-person-running"></i>
                    <span className='HeaderLogoTitle'>Fitr</span>
                </div>
                <span className='HeaderHomeTitle'><Link className="Link" to={'/'}>Home</Link></span>
                <span className='HeaderAnalyticsTitle'><Link className="Link" to={'/Analytics'}>Analytics</Link></span>
            </div>

            { toggleAddActivityButton? <div className='HeaderTitleRight'>
                <span>Activity</span>
                <button className='button-18' onClick={props.toggleActivityMenu}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div> : '' }
    </div>
    );
};