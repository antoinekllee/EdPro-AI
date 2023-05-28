import React from "react";

import * as FaIcons from "react-icons/fa";

import Title from "../components/Title";
import Button from "../components/Button";

import classes from "./Dashboard.module.css";

function Dashboard(props) {
    const { fade } = props;

    return (
        <div className={classes.container}>
            <Title text="EdPro AI" />
            <div>
                <div className={classes.buttonContainer}>
                    <Button
                        className={classes.twoColumnButton}
                        onClick={() => fade("/mentor-report")}
                        IconComponent={FaIcons.FaPenFancy}
                        text="Mentor Reports"
                    />
                    <Button
                        className={classes.twoColumnButton}
                        onClick={() => fade("/curriculum-form")}
                        IconComponent={FaIcons.FaKeyboard}
                        text="Curriculum Design"
                    />
                    <Button
                        className={classes.twoColumnButton}
                        onClick={() => fade("/lessons")}
                        IconComponent={FaIcons.FaChalkboardTeacher}
                        text="Lesson Plans"
                    />
                    <Button
                        className={classes.twoColumnButton}
                        onClick={() => fade("/mindmap")}
                        IconComponent={FaIcons.FaMapMarked}
                        text="Mindmap Visualisations"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
