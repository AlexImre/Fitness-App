import React, { useState } from 'react'

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
        <div className='RegisterContainer'>
            <form method="post" action="register">
                <h1>Register Page</h1>
                <input type="text" name="uname" placeholder='Enter username' onChange={setUsername} />
                <input type="password" name="pw" placeholder='Enter password' onChange={setPassword} />
                <input type="submit" value="Submit" onClick={registerAccount} />
            </form>
        </div>
    )
}