import React from "react";

import * as FaIcons from "react-icons/fa";
import Button from "../components/Button";

import classes from "./CurriculumItem.module.css";

function CurriculumItem(props) {
    const { subject, unitTitle, numOfWeeks, viewCurriculum } = props;

    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <h3>Curriculum for {subject} - {unitTitle}</h3>
                <h4>{numOfWeeks} Weeks</h4> {/* Make this h4 to make it slightly smaller than the title */}
            </div>
            <div className={classes.button}>
                <Button
                    onClick={viewCurriculum}
                    IconComponent={FaIcons.FaEye}
                    text="View"
                />
            </div>
        </div>
    );
}

export default CurriculumItem;