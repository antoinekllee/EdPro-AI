import React, { useRef, useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"

import UserContext from '../store/UserContext';
import LoadingContext from '../store/LoadingContext';

import Title from '../components/Logo';
import Button from '../components/Button';

import classes from './LoginPage.module.css'

function SignupPage (props)
{
    const { setUser } = useContext (UserContext); 
    const { setIsLoading } = useContext (LoadingContext);

    const usernameRef = useRef(); 
    const emailRef = useRef(); 
    const confirmEmailRef = useRef(); 
    const passwordRef = useRef(); 
    const confirmPasswordRef = useRef(); 

    const signup = async(e) => 
    {
        e.preventDefault(); 

        const username = usernameRef.current.value; 
        const email = emailRef.current.value; 
        const confirmEmail = confirmEmailRef.current.value; 
        const password = passwordRef.current.value; 
        const confirmPassword = confirmPasswordRef.current.value; 

        if (email !== confirmEmail)
        {
            console.log ("EMAILS DO NOT MATCH"); 
            alert("Emails do not match");
            return; 
        }

        if (password !== confirmPassword)
        {
            console.log ("PASSWORDS DO NOT MATCH"); 
            alert("Passwords do not match");
            return; 
        }

        setIsLoading(true);

        const signupData = { username, email, password }; 

        const response = await fetch ("/api/user/new", 
        { 
            body: JSON.stringify (signupData), // send over text representation of json object 
            headers: { "Content-Type": "application/json" }, 
            method: "POST"
        }); 
        const data = await response.json(); 

        if (data.status === "ERROR")
        {
            console.log(data.message); 
            alert(data.message);
        }
        else
        {
            props.fade('/', { replace: true }); 
            setUser(data.user); 
        }

        setIsLoading(false);
    }

    return (
        <div>
            <div className={classes.mainContainer}>
                <Title />
                <p>Sign Up</p>
                <form onSubmit={signup} className={classes.form}>
                    <input type="text" placeholder='Username' required ref={usernameRef}></input>
                    <input type="email" placeholder='Email' required ref={emailRef} ></input>
                    <input type="email" placeholder='Confirm Email' required ref={confirmEmailRef} ></input>
                    <input type="password" placeholder='Password' required ref={passwordRef}></input>
                    <input type="password" placeholder='Confirm Password' required ref={confirmPasswordRef}></input>
                    <Button type="submit" text="Sign Up" IconComponent={FaIcons.FaUserPlus} buttonWidth="180px" buttonHeight="36px" isBlue />
                    <p className={classes.orText}>or</p>
                    <Button type="button" onClick={() => props.fade('/login')} text="Login" IconComponent={FaIcons.FaSignInAlt} buttonWidth="180px" buttonHeight="36px" />
                </form> 
            </div>
        </div>
    );
}

export default SignupPage; 


