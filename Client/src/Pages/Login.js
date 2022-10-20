import React from 'react'

export const Login = () => {
    return (
        <div className='LoginContainer'>
            <form method="post" action="register">
                <h1>Login Page</h1>
                <input type="text" name="uname" placeholder='Enter username' />
                <input type="password" name="pw" placeholder='Enter password' />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}