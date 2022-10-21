import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';

export const Login = () => {
    return (
        <div className='LoginMasterContainer'>
        <div className='LoginContainer'>
            <form method="post" action="register">
                <div className='LoginWrapper'>
                    <div className='LoginLogo'>
                        <i className="fa-solid fa-person-running"></i>
                    </div>
                    <h1 className='LoginTitle'>Fitr</h1>
                    <div className='LoginAccess'>
                        <span className='LoginPrompt'>Login to your account</span>
                        <span className='LoginUserNameText'>Username</span>
                        <input className='LoginInput' type="text" name="uname" />
                        <span className='LoginPasswordText'>Password</span>
                        <input className='LoginInput' type="password" name="pw" />
                        <button className='button-1'>Login</button>
                        <span className='LoginRegisterPrompt'>Not registered? <Link to="/Register" className='LoginRegisterLink'><strong>Create an account</strong></Link></span>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    )
}