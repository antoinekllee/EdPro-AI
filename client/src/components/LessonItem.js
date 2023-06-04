import React, { useState, useContext } from "react";
import classes from "./LessonItem.module.css";
import Button from "./Button";
import LoadingContext from "../store/LoadingContext";

function LessonItem(props) {
    const { item } = props;

    const { setIsLoading } = useContext(LoadingContext);
    const [week, setWeek] = useState(item.week);
    const [conceptualUnderstanding, setConceptualUnderstanding] = useState(item.conceptualUnderstanding);
    const [benchmark, setBenchmark] = useState(item.benchmark);
    const [conceptualQuestion, setConceptualQuestion] = useState(item.conceptualQuestion);

    const [numClasses, setNumClasses] = useState(item.numClasses);
    const [classLength, setClassLength] = useState(item.classLength);

    const viewPlan = async() => {
        await saveLesson();
        props.fade("/lesson", { lessonId: item._id })
    }

    const handleNumClassesChange = (e) => {
        if (e.target.value >= 0) {
            setNumClasses(e.target.value);
        }
    }

    const handleClassLengthChange = (e) => {
        if (e.target.value >= 0) {
            setClassLength(e.target.value);
        }
    }

    const saveLesson = async () => 
    {
        // post to route /curriculum/update-lesson with payload of every value which includes
        // the lessonId, week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength

        if (!week || !conceptualUnderstanding || !benchmark || !conceptualQuestion || !numClasses || !classLength) {
            alert("All fields are required");
            return;
        }

        setIsLoading(true);

        const state = { week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength };

        const response = await fetch("/api/curriculum/update-lesson", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ ...state, lessonId: item._id }),
        });

        const data = await response.json();

        if (data.status !== "OK") {
            alert(data.message);
            return;
        }

        setIsLoading(false);
    }

    const generatePlan = async() => 
    {   
        if (!week || !conceptualUnderstanding || !benchmark || !conceptualQuestion || !numClasses || !classLength) {
            alert("All fields are required");
            setIsLoading(false);
            return;
        }
        
        await saveLesson();

        setIsLoading(true);

        const state = { week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength }; 

        const response = await fetch("/api/generate/lesson", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(state),
        });
        
        const data = await response.json();
        if (data.status !== "OK") {
            alert(data.message);
            setIsLoading(false);
            return;
        }
        const lessonPlan = data.lessonPlan;

        const payload = { ...state, lessonPlan, lessonId: item._id };

        console.log ("FINISHED GENERATING WITH PAYLOAD:")
        console.log (payload)

        const responseDb = await fetch("/api/curriculum/update-lesson", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const dataDb = await responseDb.json();

        props.fade("/lesson", { lessonId: dataDb.lesson._id })

        setIsLoading(false);
    }

    return (
        <div className={classes.lessonItem}>
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
            <div className={classes.row}>
                <div className={classes.field}>
                    <label>Number of Lessons</label>
                    <input
                        type="number"
                        value={numClasses}
                        onChange={handleNumClassesChange}
                        min="0"
                        placeholder="Number of Lessons"
                    />
                </div>
                <div className={classes.field}>
                    <label>Length of each Lesson (minutes)</label>
                    <input
                        type="number"
                        value={classLength}
                        onChange={handleClassLengthChange}
                        min="0"
                        placeholder="Length of each Lesson"
                    />
                </div>
            </div>
            <div className={classes.buttonContainer}>
                {/* <Button text="Delete" buttonWidth="100px" onClick={props.onRemove} /> */}
                <Button text="Save" buttonWidth="100px" onClick={saveLesson} />
                <Button text="Plan" buttonWidth="100px" onClick={generatePlan} />
                <Button text="View" buttonWidth="100px" onClick={viewPlan} />
            </div>
        </div>
    );
}

export default LessonItem;
