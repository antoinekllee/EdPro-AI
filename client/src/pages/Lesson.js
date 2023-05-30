import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from "./Lesson.module.css";
import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";
import LoadingContext from "../store/LoadingContext";

function Lesson(props) {
    const navigate = useNavigate();
    const { setIsLoading } = useContext(LoadingContext);

    const { state } = useLocation();
    const [week, setWeek] = useState("");
    const [conceptualUnderstanding, setConceptualUnderstanding] = useState("");
    const [benchmark, setBenchmark] = useState("");
    const [conceptualQuestion, setConceptualQuestion] = useState("");
    const [numClasses, setNumClasses] = useState("");
    const [classLength, setClassLength] = useState("");
    const [lessonPlan, setLessonPlan] = useState("");

    // const [subject, setSubject] = useState(""); 

    useEffect(() => {
        console.log (state);
        
        if (!state || !state.lessonId) {
            navigate("/dashboard");
            return;
        }

        const fetchLesson = async () => {
            setIsLoading(true);

            const response = await fetch(`/curriculum/lesson/${state.lessonId}`);
            const data = await response.json();

            setIsLoading(false);

            if (data.status === "ERROR") {
                return alert("Failed to fetch lesson data");
            }   

            const lesson = data.lesson;
            setWeek(lesson.week);
            setConceptualUnderstanding(lesson.conceptualUnderstanding);
            setBenchmark(lesson.benchmark);
            setConceptualQuestion(lesson.conceptualQuestion);
            setNumClasses(lesson.numClasses);
            setClassLength(lesson.classLength);
            setLessonPlan(lesson.lessonPlan);
        };

        fetchLesson();
    }, [state, navigate, setIsLoading]);
    
    return (
        <div className={classes.container}>
            <h1>Lesson</h1>
            <h2>Week: {week}</h2>
            <h2>Conceptual Understanding: {conceptualUnderstanding}</h2>
            <h2>Benchmark: {benchmark}</h2>
            <h2>Conceptual Question: {conceptualQuestion}</h2>
            <h2>Number of Classes: {numClasses}</h2>
            <h2>Class Length: {classLength}</h2>
            <h2>Lesson Plan</h2>
            <p>{lessonPlan}</p>

        </div>
    );
}

export default Lesson;
