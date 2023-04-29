import React from 'react'
import classes from './IconButton.module.css'

function IconButton (props)
{
    // Get the faicon from props
    const { Icon, onClick } = props;

    return <button className={classes.button} onClick={onClick}><Icon className={classes.icon} /></button>; 
}

export default IconButton; 