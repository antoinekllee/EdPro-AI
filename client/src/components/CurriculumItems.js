import React from "react";

import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";

import classes from "./CurriculumItem.module.css";

function CurriculumItem(props) {
    const { subject, unitTitle, weeks, viewCurriculum } = props;

    return (
        <div className={classes.container}>
            <div>
                <h3>{subject}</h3>
                <h3>{unitTitle}</h3>
                <h3>{weeks} Weeks</h3>
            </div>
            <Button
                onClick={viewCurriculum}
                IconComponent={FaIcons.FaEye}
                text="View"
            />
        </div>
    );
}

export default CurriculumItem;