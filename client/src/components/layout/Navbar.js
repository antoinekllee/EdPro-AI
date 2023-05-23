import React, { useContext } from 'react'

import classes from './Navbar.module.css'

import * as FaIcons from "react-icons/fa"

import LoadingContext from '../../store/LoadingContext';
import UserContext from '../../store/UserContext';

import IconButton from '../IconButton';

import logo from '../../assets/logo.png'; 

function Navbar(props)
{
    const { fade } = props;

    const { user, setUser } = useContext (UserContext); 
    const { setIsLoading } = useContext (LoadingContext); 

    const logout = async() => 
    {
        setIsLoading (true); 

        const response = await fetch ("/user/logout", 
        { 
            headers: { "Content-Type": "application/json" }, 
            method: "GET"
        }); 
        const data = await response.json(); 
        
        if (data.status === "ERROR")
            console.log("Error logging out: " + data.message);
        else
        {
            fade("/landing"); 
            setUser(null); 
        }

        setIsLoading(false); 
    }

    return (<div className={classes.navContainer}>
        <div className={classes.navLeft}>
            <h3 className={classes.logoText} onClick={() => fade('/')}><img src={logo} alt="Logo" className={classes.logo} />EdPro AI</h3>
            <IconButton Icon={FaIcons.FaHome} onClick={() => console.log ("Home")} />
            <IconButton Icon={FaIcons.FaInfo} onClick={() => console.log ("INFO")} />
            <IconButton Icon={FaIcons.FaCog} onClick={() => console.log ("SETTINGS")} />
        </div>
        <div className={classes.navRight}>
            <IconButton Icon={FaIcons.FaUser} onClick={() => console.log ("ACCOUNT")} />
            <p className={classes.userText}>{user ? user.username : "Anonymous"}</p>
            <IconButton Icon={FaIcons.FaSignOutAlt} onClick={logout} />
        </div>
    </div>); 
}

export default Navbar; 