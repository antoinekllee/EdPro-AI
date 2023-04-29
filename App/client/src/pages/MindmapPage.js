import React from "react";
import MarkmapComponent from "../components/MarkmapComponent";
import classes from "./MindmapPage.module.css";

const MindmapPage = () => {
    const markdown = `
  # markmap

- beautiful
- useful
- easy
- interactive
`; // The example markdown you provided

    return (
        <div>
            <div className={classes.mainContainer}>
                <h1 className={classes.title}>Mindmap Generator</h1>
                <div className={classes.mindmapContainer}>
                    <MarkmapComponent markdown={markdown} />
                </div>
            </div>
        </div>
    );
};

export default MindmapPage;
