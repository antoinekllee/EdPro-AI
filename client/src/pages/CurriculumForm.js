import React, { useState, useContext } from "react";
import classes from "./CurriculumForm.module.css";
import * as FaIcons from "react-icons/fa";

import LoadingContext from "../store/LoadingContext";

import Title from "../components/Title";
import Button from "../components/Button";
import Strand from "../components/Strand";

function CurriculumForm(props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [subject, setSubject] = useState(""); 
    const [unitTitle, setUnitTitle] = useState("");
    const [weeks, setWeeks] = useState(1);
    const [strands, setStrands] = useState([]);

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

    const stringifyStrands = (strands) =>
    {
        return strands.map((strand, index) => `Strand ${index + 1}: ${strand.title}`).join("\n");
    }
      

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!subject || !unitTitle || !weeks || !strands) return alert("All fields are required");

        setIsLoading(true);

        const state = { subject, unitTitle, weeks, strands: stringifyStrands(strands) }; 
        props.fade("/curriculum", state);
    };

    return (
        <div className={classes.mainContainer}>
            <Title text="Curriculum Designer" />
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formContent}>
                    <p>Subject</p> 
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
            </form>
        </div>
    );
}

export default CurriculumForm;