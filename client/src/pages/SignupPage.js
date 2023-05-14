import React, { useRef, useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"

import UserContext from '../store/UserContext';
import Title from '../components/Logo';

import classes from './LoginPage.module.css'

function SignupPage (props)
{
    const { setUser } = useContext (UserContext); 

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
            // confirmEmailRef.current.setCustomValidity("Emails do not match"); 
            return; 
        }

        if (password !== confirmPassword)
        {
            console.log ("PASSWORDS DO NOT MATCH"); 
            // confirmPasswordRef.current.setCustomValidity("Passwords do not match"); 
            return; 
        }

        const signupData = { username, email, password }; 

        const response = await fetch ("/user/new", 
        { 
            body: JSON.stringify (signupData), // send over text representation of json object 
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
            <Title />
            <p>Sign Up</p>
            <form onSubmit={signup} className={classes.form}>
                <input type="text" placeholder='Username' required ref={usernameRef}></input>
                <input type="email" placeholder='Email' required ref={emailRef} ></input>
                <input type="email" placeholder='Confirm Email' required ref={confirmEmailRef} ></input>
                <input type="password" placeholder='Password' required ref={passwordRef}></input>
                <input type="password" placeholder='Confirm Password' required ref={confirmPasswordRef}></input>
                <button type="submit"><FaIcons.FaUserPlus className={classes.buttonIcon} />Sign Up</button>
                <p>or</p>
                <button type="button" onClick={() => props.fade('/login')}><FaIcons.FaSignInAlt className={classes.buttonIcon} />Login</button>
            </form>
            {/* <p>Powered by generative AI, our project is a compact webapp that can write IB-style past paper questions of the requested topic/unit. It generates questions, mark schemes, and model answers, as well as mark answers uploaded by students.</p> */}
            {/* <div className={classes.buttons}>
                <button onClick={login}><FaIcons.FaUserPlus className={classes.buttonIcon} />Sign Up</button>
                <button onClick={login}><FaIcons.FaSignInAlt className={classes.buttonIcon} />Login</button>
            </div> */}
            {/* <button className={classes.moreInfoButton}>More Info<br /><AiIcons.AiOutlineDown className={classes.moreInfoIcon} /></button> */}
        </div>
    </div>
}

export default SignupPage; 


