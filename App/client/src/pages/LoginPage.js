import React, { useRef, useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"

import UserContext from '../store/UserContext';

import Title from '../components/Title';
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
            <Title />
            <p>Login</p>
            <form onSubmit={login} className={classes.form}>
                <input type="text" placeholder='Username' required ref={usernameRef}></input>
                <input type="password" placeholder='Password' required ref={passwordRef}></input>
                <button type="submit"><FaIcons.FaSignInAlt className={classes.buttonIcon} />Login</button>
                <p>or</p>
                <button type="button" onClick={() => props.fade('/signup')}><FaIcons.FaUserPlus className={classes.buttonIcon} />Sign Up</button>
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

export default LoginPage; 


