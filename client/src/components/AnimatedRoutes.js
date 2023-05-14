import React, { useState } from 'react'; 
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { motion } from 'framer-motion'; 

import Navbar from './layout/Navbar';

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

import MentorReportPage from "../pages/MentorReportPage";
import Dashboard from '../pages/Dashboard';
import MindmapPage from '../pages/MindmapPage';
import CurriculumForm from '../pages/CurriculumForm';
// import QuestionPage from '../pages/QuestionPage';

// import NotFound from "../pages/NotFound";

function AnimatedRoutes()
{
    const navigate = useNavigate();
    const location = useLocation();

    const [isFading, setIsFading] = useState(false); 

    const fade = (url, state=undefined) => 
    {
        setIsFading(true); 
        setTimeout(() => 
        {
            if (state === undefined)
                navigate(url)
            else
                navigate (url, { state });

            setIsFading(false); 
        }, 200); 
    }

    const showNavbar = !['/landing', '/login', '/signup'].includes(location.pathname);

    return (
        <div>
            {showNavbar && <Navbar fade={fade} />}  
            {/* <Navbar fade={fade} /> */}
            {/* <QuestionPage /> */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: isFading ? 0 : 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Routes>
                    <Route path="/landing" element={<LandingPage fade={fade} />} />
                    <Route path="/login" element={<LoginPage fade={fade} />} />
                    <Route path="/signup" element={<SignupPage fade={fade} />} />
                    <Route path="/" element={<Dashboard fade={fade} />} />
                    <Route path="/mentor-report" element={<MentorReportPage fade={fade} />} />
                    <Route path="/mindmap" element={<MindmapPage fade={fade} />} />
                    <Route path="/curriculum" element={<CurriculumForm fade={fade} />} />
                    <Route path="*" element={<Dashboard fade={fade} />} />
                </Routes>
            </motion.div>
        </div>
    )
}

export default AnimatedRoutes;
