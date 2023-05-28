import React, { useState, useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from "./CurriculumOutput.module.css";
import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";
import CurriculumItem from "../components/CurriculumItem";

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

    const [curriculumItems, setCurriculumItems] = useState([]);

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
                const { curriculumItems } = data;
                setCurriculumItems(curriculumItems);
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

      const addCurriculumItem = () => {
        setCurriculumItems([
            ...curriculumItems,
            {
                week: "",
                conceptualUnderstanding: "",
                benchmark: "",
                conceptualQuestion: "",
            },
        ]);
    };

    const removeCurriculumItem = (index) => {
        const newCurriculumItems = [...curriculumItems];
        newCurriculumItems.splice(index, 1);
        setCurriculumItems(newCurriculumItems);
    };
    return (
        <div className={classes.container}>
            <h1>Curriculum for {subject} - {unitTitle}</h1>
            <h2>{weeks} weeks</h2>
            {strandsArr.map((strand, index) => (<h4 key={index}>{strand}</h4>))}
            {curriculumItems.map((curriculumItem, index) => (
                <CurriculumItem
                    key={index}
                    index={index}
                    item={curriculumItem}
                    onRemove={() => removeCurriculumItem(index)}
                />
            ))}
            <Button
                IconComponent={FaIcons.FaPlus}
                onClick={addCurriculumItem}
                text="Add Curriculum Item"
                buttonWidth="250px"
            />
        </div>
    );
}

export default CurriculumOutput;
