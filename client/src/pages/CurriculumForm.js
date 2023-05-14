import React, { useState, useContext } from "react";
import classes from "./CurriculumForm.module.css";
import * as FaIcons from "react-icons/fa";
import Title from "../components/Title";
import LoadingContext from "../store/LoadingContext";
import Button from "../components/Button";
import Strand from "../components/Strand";
import CurriculumItem from "../components/CurriculumItem";

function CurriculumForm(props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [unitTitle, setUnitTitle] = useState("");
    const [weeks, setWeeks] = useState(1);
    const [strands, setStrands] = useState([]);
    const [curriculumItems, setCurriculumItems] = useState([]);

    const handleInputChange = (e) => {
        setUnitTitle(e.target.value);
    };

    const handleWeeksChange = (e) => {
        setWeeks(e.target.value);
    };

    const addStrand = () => {
        setStrands([...strands, { title: "" }]);
    };

    const removeStrand = (index) => {
        const newStrands = [...strands];
        newStrands.splice(index, 1);
        setStrands(newStrands);
    };

    const handleStrandChange = (index, value) => {
        const newStrands = [...strands];
        newStrands[index].title = value;
        setStrands(newStrands);
    };

    const addCurriculumItem = () => {
        setCurriculumItems([
            ...curriculumItems,
            {
                week: "",
                conceptualUnderstanding: "",
                benchmark: "",
                conceptualUnderstanding: "",
            },
        ]);
    };

    const removeCurriculumItem = (index) => {
        const newCurriculumItems = [...curriculumItems];
        newCurriculumItems.splice(index, 1);
        setCurriculumItems(newCurriculumItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        console.log("Unit Title:", unitTitle);
        console.log("Weeks:", weeks);
        console.log("Strands:", strands);

        const payload = { unitTitle, weeks, strands };

        const response = await fetch("/generate/curriculum", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data);
        
        // Set test curriculum items for now
        const testCurriculumItems = [
            {
                week: "Week 1",
                conceptualUnderstanding: "CU 1",
                benchmark: "B 1",
                conceptualQuestion: "CQ 1",
            },
            {
                week: "Week 2",
                conceptualUnderstanding: "CU 2",
                benchmark: "B 2",
                conceptualQuestion: "CQ 2",
            },
            {
                week: "Week 3",
                conceptualUnderstanding: "CU 3",
                benchmark: "B 3",
                conceptualQuestion: "CQ 3",
            },
        ];

        setCurriculumItems(testCurriculumItems);

        setIsLoading(false);
    };

    return (
        <div className={classes.mainContainer}>
            <Title text="Curriculum Form" />
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formContent}>
                    <div className={classes.formLeft}>
                        <p>Unit Title</p>
                        <input
                            type="text"
                            value={unitTitle}
                            onChange={handleInputChange}
                            placeholder="Unit Title"
                        />
                        <p>Weeks</p>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={weeks}
                            onChange={handleWeeksChange}
                        />
                        <p>Strands</p>
                        {strands.map((strand, index) => (
                            <Strand
                                key={index}
                                value={strand.title}
                                onChange={(value) =>
                                    handleStrandChange(index, value)
                                }
                                onRemove={() => removeStrand(index)}
                            />
                        ))}
                        <Button
                            IconComponent={FaIcons.FaPlus}
                            onClick={addStrand}
                            text="Add Strand"
                            buttonWidth="150px"
                        />
                        <br />
                        <Button
                            IconComponent={FaIcons.FaCheck}
                            onClick={handleSubmit}
                            text="Submit"
                            buttonWidth="150px"
                            type="submit"
                        />
                    </div>
                    <div className={classes.outputContent}>
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
                </div>
            </form>
        </div>
    );
}

export default CurriculumForm;
