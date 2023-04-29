import classes from './Title.module.css'

// import * as FaIcons from "react-icons/fa"
import logo from '../assets/logo.png'

function Title (props)
{
    return <div>
        <h1 className={classes.title}>Nexus<div className={classes.logoWrapper}><img src={logo} alt="Logo" className={classes.logo} /></div></h1>
        {/* <h1 className={classes.title}>Nexus<img src={logo} alt="Logo" className={classes.logo} /></h1> */}
    </div>; 
}

export default Title; 