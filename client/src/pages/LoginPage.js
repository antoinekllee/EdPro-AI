import React, { useRef, useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"

import UserContext from '../store/UserContext';

import Button from '../components/Button';
import Logo from '../components/Logo';
import classes from './LoginPage.module.css'

function LoginPage (props)
{
    const { setUser } = useContext (UserContext); 

    const usernameRef = useRef(); 
    const passwordRef = useRef(); 

    const login = async(e) => 
    {
        e.preventDefault(); 

        const username = usernameRef.current.value; 
        const password = passwordRef.current.value; 
        
        const loginData = { username, password }; 

        const response = await fetch ("/user/login", 
        { 
            body: JSON.stringify (loginData), // send over text representation of json object 
            headers: { "Content-Type": "application/json" }, 
            method: "POST"
        }); 
        const data = await response.json(); 

        if (data.status === "ERROR")
            console.log(data.message); 
        else
        {
            props.fade('/', { replace: true }); 
            setUser(data.user); 
        }
    }

return <div>
        <div className={classes.mainContainer}>
            <Logo />
            <p>Login</p>
            <form onSubmit={login} className={classes.form}>
                <input type="text" placeholder='Username' required ref={usernameRef}></input>
                <input type="password" placeholder='Password' required ref={passwordRef}></input>
                <Button type="submit" text="Login" IconComponent={FaIcons.FaSignInAlt} buttonWidth="180px" buttonHeight="36px" isBlue />
                <p className={classes.orText}>or</p>
                <Button type="button" onClick={() => props.fade('/signup')} text="Sign Up" IconComponent={FaIcons.FaUserPlus} buttonWidth="180px" buttonHeight="36px" />
            </form> 
        </div>
    </div>
}

export default LoginPage; 


