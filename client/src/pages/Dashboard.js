import React, { useEffect, useState, useContext } from "react";

import * as FaIcons from "react-icons/fa";

import Title from "../components/Title";
import Button from "../components/Button";

import LoadingContext from "../store/LoadingContext";
import CurriculumItem from "../components/CurriculumItems";

import classes from "./Dashboard.module.css";

function Dashboard(props) {
    const { fade } = props;
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [curriculums, setCurriculums] = useState([]);

    useEffect(() => {
        const getCurriculums = async () => {
            setIsLoading(true);

            const response = await fetch("/curriculum");
            const data = await response.json();

            if (data.status === "ERROR") {
                alert(data.message);
                return;
            }

            setCurriculums(data.curriculums);

            setIsLoading(false);
        };

        getCurriculums();
    }, [setIsLoading]);

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
            <h2>Curriculums</h2>
            <br />
            { curriculums && curriculums.map((curriculum) => (
                <CurriculumItem
                    key = {curriculum._id}
                    subject={curriculum.subject}
                    unitTitle={curriculum.unitTitle}
                    week={curriculum.week}
                    viewCurriculum={() => fade("/curriculum", { curriculumId: curriculum._id })}
                />
            ))}
        </div>
    );
}

export default Dashboard;
