import React, { useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"

import UserContext from '../store/UserContext';

import Title from '../components/Logo';
import Button from '../components/Button';
import landingImage from '../assets/landing_image.png'

import classes from './LandingPage.module.css'

function LandingPage (props)
{
    const { user } = useContext (UserContext); 

    return (
        <div className={classes.mainContainer}>
            <div className={classes.leftContainer}>
                <Title />
                <p>A webapp for supporting educators by leveraging AI technology.</p>
                <div className={classes.buttons}>
                    <Button onClick={() => props.fade('/signup')} text="Get Started" IconComponent={FaIcons.FaUserPlus} buttonWidth="200px" isBlue />
                    <Button onClick={() => props.fade(user ? '/' : '/login')} text="Login" IconComponent={FaIcons.FaSignInAlt} buttonWidth="200px" />
                </div>
            </div>
            <div>
                <img src={landingImage} className={classes.landingPageImage} alt="Landing"/>
            </div>
        </div>
    )
}


export default LandingPage; 