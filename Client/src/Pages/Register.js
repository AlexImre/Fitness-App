import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';

export const Register = () => {
    // https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const registerAccount = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: { uname: username, pw: password }
    };
    // does state need to be updated with passport?
    await fetch('/register', requestOptions);
    }

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
                        <span className='LoginPrompt'>Create new account</span>
                        <span className='LoginUserNameText'>Username</span>
                        <input className='LoginInput' type="text" name="uname" onChange={setUsername} />
                        <span className='LoginPasswordText'>Password</span>
                        <input className='LoginInput' type="password" name="pw" onChange={setPassword} />
                        <button className='button-1' onClick={registerAccount}>Create</button>
                        <span className='LoginRegisterPrompt'>Already have an account? <Link to="/Login" className='LoginRegisterLink'><strong>Login</strong></Link></span>
                    </div>
                </div>
            </form>
        </div>
        <Footer />
        </div>
    )
}