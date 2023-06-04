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
    const [curriculumId, setCurriculumId] = useState("");

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
            setCurriculumId(lesson.curriculum);
        };

        fetchLesson();
    }, [state, navigate, setIsLoading]);

    const handleSave = async () => {
        if (!week || !conceptualUnderstanding || !benchmark || !conceptualQuestion || !numClasses || !classLength || !lessonPlan) {
            return alert("All fields are required");
        }

        setIsLoading(true);

        const response = await fetch('/curriculum/update-lesson', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lessonId: state.lessonId,
                week,
                conceptualUnderstanding,
                benchmark,
                conceptualQuestion,
                numClasses,
                classLength,
                lessonPlan,
            }),
        });

        const data = await response.json(); 

        if (data.status === "ERROR") {
            return alert("Failed to update lesson");
        }

        setIsLoading(false);
    };
    
    return (
        <div className={classes.container}>
            <h1>Lesson</h1>
            <div className={classes.field}>
                <label>Week</label>
                <input
                    type="text"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    placeholder="Week"
                />
            </div>
            <div className={classes.field}>
                <label>Conceptual Understanding</label>
                <textarea
                    rows="3"
                    value={conceptualUnderstanding}
                    onChange={(e) => setConceptualUnderstanding(e.target.value)}
                    placeholder="Conceptual Understanding"
                />
            </div>
            <div className={classes.field}>
                <label>Benchmark</label>
                <textarea
                    rows="3"
                    value={benchmark}
                    onChange={(e) => setBenchmark(e.target.value)}
                    placeholder="Benchmark"
                />
            </div>
            <div className={classes.field}>
                <label>Conceptual Question</label>
                <textarea
                    rows="3"
                    value={conceptualQuestion}
                    onChange={(e) => setConceptualQuestion(e.target.value)}
                    placeholder="Conceptual Question"
                />
            </div>
            <div className={classes.field}>
                <label>Number of Classes</label>
                <input
                    type="number"
                    value={numClasses}
                    onChange={(e) => setNumClasses(e.target.value)}
                    placeholder="Number of Classes"
                />
            </div>
            <div className={classes.field}>
                <label>Class Length</label>
                <input
                    type="number"
                    value={classLength}
                    onChange={(e) => setClassLength(e.target.value)}
                    placeholder="Class Length"
                />
            </div>
            <div className={classes.field}>
                <label>Lesson Plan</label>
                <textarea
                    className={classes.lessonPlanTextarea} /* Add specific class */
                    rows="30"
                    value={lessonPlan}
                    onChange={(e) => setLessonPlan(e.target.value)}
                    placeholder="Lesson Plan"
                />
            </div>

            {/* Save button */}
            <div className={classes.buttonContainer}>
                <Button
                    onClick={() => props.fade("/curriculum", { curriculumId })}
                    IconComponent={FaIcons.FaArrowLeft}
                    buttonWidth="200px"
                    text="Back"
                />
                <Button
                    onClick={handleSave}
                    IconComponent={FaIcons.FaSave}
                    buttonWidth="200px"
                    text="Save"
                />
            </div>
        </div>
    );
}

export default Lesson;
