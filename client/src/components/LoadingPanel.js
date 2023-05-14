import { motion } from 'framer-motion';
import classes from './LoadingPanel.module.css'; 

import * as ImIcons from "react-icons/im";

function Loading () 
{
    return (
        <motion.div className={classes.container} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear', frame: 60 }}
            >
                <ImIcons.ImSpinner2 className={classes.icon} />
            </motion.div>
        </motion.div>
    );
}

export default Loading;
