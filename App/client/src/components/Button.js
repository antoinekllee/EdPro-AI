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
    } = props;

    const buttonStyle = {
        width: buttonWidth,
    };

    return (
        <button
            className={`${classes.submitButton} ${className}`}
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
