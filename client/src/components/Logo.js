import classes from './Logo.module.css'

// import * as FaIcons from "react-icons/fa"
import logo from '../assets/logo.png'

function Logo (props)
{
    return <div>
        <h1 className={classes.title}>EdPro AI<div className={classes.logoWrapper}><img src={logo} alt="Logo" className={classes.logo} /></div></h1>
    </div>; 
}

export default Logo; 