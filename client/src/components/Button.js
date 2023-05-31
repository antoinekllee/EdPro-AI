import React from "react";
import classes from "./Button.module.css";

function Button(props) {
    const {
        IconComponent,
        onClick,
        text,
        buttonWidth = "auto",
        type = "button",
        className, 
        isBlue
    } = props;

    const buttonStyle = {
        width: buttonWidth,
    };

    // Generate dynamic class based on 'isBlue' prop.
    const buttonClass = `${classes.submitButton} ${className} ${isBlue ? classes.blueButton : ''}`;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            style={buttonStyle}
            type={type}
        >
            {IconComponent && <IconComponent className={classes.buttonIcon} />}
            {text}
        </button>
    );
}

export default Button;
