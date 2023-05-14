import React, { useState } from "react";
import classes from "./Strand.module.css";
import * as FaIcons from "react-icons/fa";
import IconButton from "./IconButton";

function Strand({ value, onChange, onRemove }) {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className={classes.strandContainer}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="New Strand"
            />
            <IconButton Icon={FaIcons.FaMinus} onClick={onRemove} />
        </div>
    );
}

export default Strand;
