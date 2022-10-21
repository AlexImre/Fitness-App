import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';

export const Register = () => {
    const navigate = useNavigate();
    // https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
    const [username, setUsername] = useState();
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const [password, setPassword] = useState();
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    // ADD ERROR HANDLING TO .THEN(NAVIGATE) OTHERWISE IT WILL ALWAYS GO TO LOGIN
    const registerAccount = async (e) => {
        e.preventDefault();
        console.log('YOU HIT THE REGISTER BUTTON!!');
        console.log(username);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ uname: username, pw: password })
        };
        console.log(requestOptions.body);
        await fetch('/register', requestOptions).then(navigate('/Login'));
    }

    // method="post" action="register"
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
                        <span className='LoginPrompt'>Create new account</span>
                        <span className='LoginUserNameText'>Username</span>
                        <input className='LoginInput' type="text" name="uname" onChange={handleUsername} />
                        <span className='LoginPasswordText'>Password</span>
                        <input className='LoginInput' type="password" name="pw" onChange={handlePassword} />
                        <button className='button-1' type="submit" onClick={(e) => registerAccount(e)}>Create</button>
                        <span className='LoginRegisterPrompt'>Already have an account? <Link to="/Login" className='LoginRegisterLink'><strong>Login</strong></Link></span>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    )
}