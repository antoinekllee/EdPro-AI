import React from "react";

import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";

import classes from "./CurriculumItem.module.css";

function CurriculumItem(props) {
    const { subject, unitTitle, numOfWeeks, viewCurriculum } = props;

    return (
        <div className={classes.container}>
            <div>
                <h3>Curriculum for {subject} - {unitTitle}</h3>
                <h3>{numOfWeeks} Weeks</h3>
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