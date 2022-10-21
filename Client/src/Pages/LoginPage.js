import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    // STATE VARIABLES
    const [username, setUsername] = useState();
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const [password, setPassword] = useState();
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    
    // HANDLE LOGIN SUCCESS OR FAILURE
    const navigate = useNavigate();
    const handleLogin = (res) => {
        console.log(res);
        if (res.status === 401) {
            setShowFailureMessage(true);
            // window.alert('invalid pass or user');
            return;
        }
        setShowFailureMessage(false);
        navigate('/Home');
    }

    // CALL BACKEND API TO LOGIN
    const login = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                uname: username,
                pw: password
            })
        };
        await fetch('/login', requestOptions)
            .then((res) => handleLogin(res));
    }

    return (
        <div className='LoginMasterContainer'>
        <div className='LoginContainer'>
            <form>
                <div className='LoginWrapper'>
                    <div className='LoginLogo'>
                        <i className="fa-solid fa-person-running"></i>
                    </div>
                    <h1 className='LoginTitle'>Fitr</h1>
                    <div className='LoginAccess'>
                        <span className='LoginPrompt'>Login to your account</span>
                        <span className='LoginUserNameText'>Username</span>
                        <input className='LoginInput' type="text" name="uname" onChange={handleUsername} />
                        <span className='LoginPasswordText'>Password</span>
                        <input className='LoginInput' type="password" name="pw" onChange={handlePassword} />
                        {showFailureMessage? <span className='LoginFailureMessage'>Invalid Username or Password</span> : ''}
                        <button className='button-1' onClick={(e) => login(e)}>Login</button>
                        <span className='LoginRegisterPrompt'>Not registered? <Link to="/Register" className='LoginRegisterLink'><strong>Create an account</strong></Link></span>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    )
}