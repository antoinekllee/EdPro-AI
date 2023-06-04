import React, { useState, useContext, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from "./CurriculumOutput.module.css";
import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";
import LessonItem from "../components/LessonItem";

import LoadingContext from "../store/LoadingContext";

function CurriculumOutput(props) {
    const navigate = useNavigate();
    const { fade } = props;
    const { setIsLoading } = useContext(LoadingContext);

    const { state } = useLocation();
    const [subject, setSubject] = useState("");
    const [unitTitle, setUnitTitle] = useState("");
    const [weeks, setWeeks] = useState(1);
    const [strands, setStrands] = useState([]);

    const [lessonItems, setLessonItems] = useState([]);

    useEffect(() => {
        console.log (state);
        
        if (!state || !state.curriculumId) {
            navigate("/dashboard");
            return;
        }

        const fetchCurriculum = async () => {
            setIsLoading(true);
            const response = await fetch(`/api/curriculum/getById/${state.curriculumId}`);
            const data = await response.json();
            setIsLoading(false);

            if (data.status === "ERROR") {
                return alert("Failed to fetch data");
            }   

            const curriculum = data.curriculum;
            setSubject(curriculum.subject);
            setUnitTitle(curriculum.unitTitle);
            setWeeks(curriculum.numOfWeeks);
            setStrands(curriculum.strands.split("\n"));
            setLessonItems(curriculum.lessons);
        };

        fetchCurriculum();
    }, [state, navigate, setIsLoading]);

    const addLessonItem = () => {
        setLessonItems([
            ...lessonItems,
            {
                week: "",
                conceptualUnderstanding: "",
                benchmark: "",
                conceptualQuestion: "",
            },
        ]);
    };

    const removeLessonItem = (index) => {
        const newLessonItems = [...lessonItems];
        newLessonItems.splice(index, 1);
        setLessonItems(newLessonItems);
    };
    
    return (
        <div className={classes.container}>
            <h1>Curriculum for {subject} - {unitTitle}</h1>
            <h2>{weeks} weeks</h2>
            { strands.map ((strand, index) => <h2 key={index}>{strand}</h2>) }
            {lessonItems.map((lessonItem, index) => (
                <LessonItem
                    key={index}
                    index={index}
                    item={lessonItem}
                    onRemove={() => removeLessonItem(index)}
                    fade={fade}
                />
            ))}
            <Button
                IconComponent={FaIcons.FaPlus}
                onClick={addLessonItem}
                text="Add Curriculum Item"
                buttonWidth="250px"
                buttonHeight="50px"
            />
        </div>
    );
}

export default CurriculumOutput;
