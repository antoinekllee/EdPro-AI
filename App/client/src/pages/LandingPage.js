import React, { useContext } from 'react'; 

import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"

import UserContext from '../store/UserContext';

import Title from '../components/Title';

import classes from './LandingPage.module.css'

function LandingPage (props)
{
    const { user } = useContext (UserContext); 

    return <div> 
        <div className={classes.mainContainer}>
            <Title />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non ligula in ligula bibendum facilisis sit amet eget massa. Nulla semper nisi et rhoncus posuere. Pellentesque at mattis metus. Pellentesque in nulla magna. Pellentesque sed consectetur lectus. Suspendisse vitae quam vitae est molestie dapibus.</p>
            <div className={classes.buttons}>
                <button onClick={() => props.fade('/signup')}><FaIcons.FaUserPlus className={classes.buttonIcon} />Sign Up</button>
                <button onClick={() => props.fade(user ? '/' : '/login')}><FaIcons.FaSignInAlt className={classes.buttonIcon} />Login</button>
            </div>
            <button className={classes.moreInfoButton}>More Info<br /><AiIcons.AiOutlineDown className={classes.moreInfoIcon} /></button>
            
        </div>
        <div className={classes.infoContainer}>
            <p>Writing Mentor Reports: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Syllabus Generation: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Lesson Plans: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Mindmap Visualisation: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
    </div> 
}

export default LandingPage; 