import React from "react";
import classes from "./Button.module.css";

function Button(props) {
    const {
        IconComponent,
        onClick,
        text,
        buttonWidth = "auto",
        buttonHeight = "auto", 
        type = "button",
        className, 
        isBlue
    } = props;

    const buttonStyle = {
        width: buttonWidth,
        height: buttonHeight, 
        fontSize: `calc(17px + ${Math.min(parseInt(buttonWidth), parseInt(buttonHeight))/50}px)`, // calculate font size based on button dimensions
    };

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
