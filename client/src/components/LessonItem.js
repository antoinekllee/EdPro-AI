import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import classes from "./LessonItem.module.css";
import IconButton from "./IconButton";
import Button from "./Button";

function LessonItem({ item, onRemove }) {
    const [week, setWeek] = useState(item.week);
    const [conceptualUnderstanding, setConceptualUnderstanding] = useState(item.conceptualUnderstanding);
    const [benchmark, setBenchmark] = useState(item.benchmark);
    const [conceptualQuestion, setConceptualQuestion] = useState(item.conceptualQuestion);

    return (
        <div className={classes.lessonItem}>
            <div className={classes.removeButton}>
                <IconButton Icon={FaIcons.FaMinus} onClick={onRemove} />
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
            <Button text="Plan" buttonWidth="100px" />
        </div>
    );
}

export default LessonItem;
