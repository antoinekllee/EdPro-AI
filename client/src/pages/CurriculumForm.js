import React, { useState, useContext } from "react";
import classes from "./CurriculumForm.module.css";
import * as FaIcons from "react-icons/fa";
import Title from "../components/Title";
import LoadingContext from "../store/LoadingContext";
import Button from "../components/Button";
import Strand from "../components/Strand";

function CurriculumForm(props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [unitTitle, setUnitTitle] = useState("");
    const [level, setLevel] = useState(1);
    const [strands, setStrands] = useState([]);

    const handleInputChange = (e) => {
        setUnitTitle(e.target.value);
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        console.log("Unit Title:", unitTitle);
        console.log("Level:", level);
        console.log("Strands:", strands);

        const payload = { unitTitle, level, strands };

        // const response = await fetch("/submit/curriculumForm", {
        //     headers: { "Content-Type": "application/json" },
        //     method: "POST",
        //     body: JSON.stringify(payload),
        // });

        // const data = await response.json();
        // console.log(data);

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
                        <p>Level</p>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={level}
                            onChange={handleLevelChange}
                        />
                        <p>Strands</p>
                        {strands.map((strand, index) => (
                            <Strand
                                key={index}
                                value={strand.title}
                                onChange={(value) => handleStrandChange(index, value)}
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
                        
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CurriculumForm;
