import classes from './Title.module.css'

import * as FaIcons from "react-icons/fa"

function Title (props)
{
    return <div>
        <h1 className={classes.title}>{props.text}<FaIcons.FaPenFancy className={classes.titleIcon} /></h1>
    </div>; 
}

export default Title; 