import React, { useState, useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from "./CurriculumOutput.module.css";
import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";
import LessonItem from "../components/LessonItem";

import LoadingContext from "../store/LoadingContext";

function CurriculumOutput(props) {
    const { fade } = props;
    const { setIsLoading } = useContext(LoadingContext);
    const isMountedRef = useRef(false);

    const { state } = useLocation();
    const [subject, setSubject] = useState("");
    const [unitTitle, setUnitTitle] = useState("");
    const [weeks, setWeeks] = useState(1);
    const [strandsArr, setStrandsArr] = useState([]);

    const [lessonItems, setLessonItems] = useState([]);

    useEffect(() => {
        if (!state) {
          fade("/");
          return;
        }
    
        setSubject(state.subject);
        setUnitTitle(state.unitTitle);
        setWeeks(state.weeks);
        setStrandsArr(state.strands.split("\n"));
    
        window.history.replaceState({}, document.title); // Clear useLocation state to return to form page on reload
    
        isMountedRef.current = true;
    
        return () => {
          isMountedRef.current = false;
        };
    }, [state, fade]);

    const updateCurriculumsDb = async (lessonItems) => {
        const { subject, unitTitle, weeks, strands } = state;
        const payload = { subject, unitTitle, weeks, strands, lessonItems };

        const response = await fetch("/curriculum/new", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        const generate = async () => {
            const { subject, unitTitle, weeks, strands } = state;
            const payload = { subject, unitTitle, weeks, strands };

            const response = await fetch("/generate/curriculum", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();
            console.log(data);

            if (isMountedRef.current && data.status === "OK") {
                const { lessonItems } = data;
                setLessonItems(lessonItems);
                updateCurriculumsDb(lessonItems);
            }
            else 
            {
                alert("Error generating curriculum");
                fade("/curriculum");
            }
    
            setIsLoading(false);
        }
    
        generate();
        
        
      }, [state, setIsLoading]);

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
            {strandsArr.map((strand, index) => (<h4 key={index}>{strand}</h4>))}
            {lessonItems.map((lessonItem, index) => (
                <LessonItem
                    key={index}
                    index={index}
                    item={lessonItem}
                    onRemove={() => removeLessonItem(index)}
                />
            ))}
            <Button
                IconComponent={FaIcons.FaPlus}
                onClick={addLessonItem}
                text="Add Curriculum Item"
                buttonWidth="250px"
            />
        </div>
    );
}

export default CurriculumOutput;
