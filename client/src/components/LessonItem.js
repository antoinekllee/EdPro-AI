import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import classes from "./LessonItem.module.css";
import IconButton from "./IconButton";
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

    const viewPlan = () => {
        props.fade("/lesson", { lessonId: item._id })
    }

    const generatePlan = async() => 
    {
        setIsLoading(true);

        if (!week || !conceptualUnderstanding || !benchmark || !conceptualQuestion || !numClasses || !classLength) {
            alert("All fields are required");
            setIsLoading(false);
            return;
        }

        const state = { week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength }; 

        const response = await fetch("/generate/lesson", {
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

        const responseDb = await fetch("/curriculum/update-lesson", {
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
            <div className={classes.removeButton}>
                <IconButton Icon={FaIcons.FaMinus} onClick={props.onRemove} />
            </div>
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
                <input
                    type="text"
                    value={conceptualUnderstanding}
                    onChange={(e) => setConceptualUnderstanding(e.target.value)}
                    placeholder="Conceptual Understanding"
                />
            </div>
            <div className={classes.field}>
                <label>Benchmark</label>
                <input
                    type="text"
                    value={benchmark}
                    onChange={(e) => setBenchmark(e.target.value)}
                    placeholder="Benchmark"
                />
            </div>
            <div className={classes.field}>
                <label>Conceptual Question</label>
                <input
                    type="text"
                    value={conceptualQuestion}
                    onChange={(e) => setConceptualQuestion(e.target.value)}
                    placeholder="Conceptual Question"
                />
            </div>
            {/* Make a number input for classes */}
            <div className={classes.field}>
                <label>Classes</label>
                <input
                    type="text"
                    value={numClasses}
                    onChange={(e) => setNumClasses(e.target.value)}
                    placeholder="Classes"
                />
            </div>
            {/* Make an input for Class Length where the value must be a number*/}
            <div className={classes.field}>
                <label>Class Length</label>
                <input
                    type="text"
                    value={classLength}
                    onChange={(e) => setClassLength(e.target.value)}
                    placeholder="Class Length"
                />
            </div>
            <Button text="Plan" buttonWidth="100px" onClick={generatePlan} />
            <Button text="View" buttonWidth="100px" onClick={viewPlan} />
        </div>
    );
}

export default LessonItem;
