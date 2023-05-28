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
    const [subject, setSubject] = useState(""); // New input for subject

    const handleInputChange = (e) => {
        setUnitTitle(e.target.value);
    };

    const handleWeeksChange = (e) => {
        setWeeks(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
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
                conceptualQuestion: "",
            },
        ]);
    };

    const removeCurriculumItem = (index) => {
        const newCurriculumItems = [...curriculumItems];
        newCurriculumItems.splice(index, 1);
        setCurriculumItems(newCurriculumItems);
    };

    const stringifyStrands = (strands) =>
    {
        return strands.map((strand, index) => `Strand ${index + 1}: ${strand.title}`).join("\n");
      }
      

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        console.log("Unit Title:", unitTitle);
        console.log("Weeks:", weeks);
        console.log("Strands:", stringifyStrands(strands));
        console.log("Subject:", subject); // Log the subject input

        const payload = { subject, unitTitle, weeks, strands: stringifyStrands(strands) }; // Include subject in the payload
        console.log(payload)

        const response = await fetch("/generate/curriculum", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        console.log(data);
        
        // Break the curriculum string into an array, using two newlines as the separator
        const curriculumBlocks = data.curriculum.split('\n\n');
        
        // Process the blocks into the desired format
        const curriculumItems = curriculumBlocks.map(block => {
            const lines = block.split('\n');
            const week = lines[0].split(': ')[1]; // split by the first colon and take the second part
            const conceptualUnderstanding = lines[1].split(': ')[1]; // split by the first colon and take the second part
            const benchmark = lines[2].split(': ')[1]; // split by the first colon and take the second part
            const conceptualQuestion = lines[3].split(': ')[1]; // split by the first colon and take the second part
        
            return {
                week,
                conceptualUnderstanding,
                benchmark,
                conceptualQuestion,
            };
        });
        
        setCurriculumItems(curriculumItems);

        

        setIsLoading(false);
    };

    return (
        <div className={classes.mainContainer}>
            <Title text="Curriculum Designer" />
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formContent}>
                    <div className={classes.formLeft}>
                        <p>Subject</p> {/* Add Subject input field */}
                        <input
                            type="text"
                            value={subject}
                            onChange={handleSubjectChange}
                            placeholder="Subject"
                        />
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