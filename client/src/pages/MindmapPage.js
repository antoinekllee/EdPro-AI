import React, { useState, useContext } from "react";
import MarkmapComponent from "../components/MarkmapComponent";
import classes from "./MindmapPage.module.css";

import * as FaIcons from "react-icons/fa";

import LoadingContext from "../store/LoadingContext";
import Button from "../components/Button";

const MindmapPage = () => {
    const { setIsLoading } = useContext(LoadingContext);

    const [markdownData, setMarkdownData] = useState({
        key: 0,
        markdown: `
    # markmap

  - beautiful
  - useful
  - easy
  - interactive`,
    });

    const [input, setInput] = useState("");

    const handleTextAreaChange = (e) => {
        setInput(e.target.value);
    };

    const generate = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const response = await fetch("/generate/mindmap", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        console.log(data.mindmap);
        setMarkdownData((prevState) => ({
            key: prevState.key + 1,
            markdown: data.mindmap,
        }));

        setIsLoading(false);
    };

    return (
        <div>
            <div className={classes.mainContainer}>
                <h1 className={classes.title}>Mindmap Generator</h1>
                <textarea
                    rows="4"
                    value={input}
                    onChange={handleTextAreaChange}
                />
                <Button
                    IconComponent={FaIcons.FaLightbulb}
                    onClick={generate}
                    text="Generate"
                    buttonWidth="150px"
                    buttonHeight="50px"
                />
                <br />
                <div className={classes.mindmapContainer}>
                    <MarkmapComponent
                        key={markdownData.key}
                        markdown={markdownData.markdown}
                    />
                </div>
            </div>
        </div>
    );
};

export default MindmapPage;
