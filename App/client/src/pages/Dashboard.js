import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import LoadingContext from '../store/LoadingContext';

import * as FaIcons from "react-icons/fa"; 

import classes from './Dashboard.module.css';

function Dashboard(props) 
{
  const { fade } = props;

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer} >
        <h2 className={classes.title}>Nexus</h2>
        <h3 className={classes.subtitle}>AI Applications in Education</h3>
      </div>
      <div>
        <p>TEXT HERE</p>
        <div className={classes.buttonContainer}>
            <button className={classes.twoColumnButton} onClick={() => fade('/mentor-report')}><FaIcons.FaPenFancy className={classes.buttonIcon} />Mentor Reports</button>
            <button className={classes.twoColumnButton} onClick={() => fade('/syllabus')}><FaIcons.FaKeyboard className={classes.buttonIcon} />Syllabus Outlines</button>
            <button className={classes.twoColumnButton} onClick={() => fade('/lessons')}><FaIcons.FaChalkboardTeacher className={classes.buttonIcon} />Lesson Plans</button>
            <button className={classes.twoColumnButton} onClick={() => fade('/mindmap')}><FaIcons.FaMapMarked className={classes.buttonIcon} />Mindmap Visualisations</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;