import React, { useState, useContext } from "react";

import classes from "./MentorReportPage.module.css";
import * as FaIcons from "react-icons/fa";

import Title from "../components/Title";

import LoadingContext from "../store/LoadingContext";
import Button from "../components/Button";

function MentorReportPage(props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [studentName, setStudentName] = useState("");
    const [casExperiences, setCasExperiences] = useState("");
    const [skills, setSkills] = useState({
        communication: false,
        collaboration: false,
        criticalThinking: false,
        creativity: false,
        resilience: false,
        perseverence: false,
        selfManagement: false,
        socialAwareness: false,
        selfAwareness: false,
        ethics: false
    });
    const [mentorReport, setMentorReport] = useState("");

    const handleInputChange = (e) => {
        setStudentName(e.target.value);
    };

    const handleTextAreaChange = (e) => {
        setCasExperiences(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setSkills({ ...skills, [e.target.name]: e.target.checked });
    };

    const generate = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        console.log("Student Name:", studentName);
        console.log("CAS Experiences:", casExperiences);
        console.log("Skills:", skills);

        // Compile skills ticked into a string
        let skillsString = "";
        for (const [key, value] of Object.entries(skills)) {
            if (value) {
                skillsString += key + ", ";
            }
        }

        const payload = { studentName, casExperiences, skills: skillsString };

        const response = await fetch("/generate/mentorReport", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data.mentorReport);
        setMentorReport(data.mentorReport);

        setIsLoading(false);
    };

    return (
            <div className={classes.mainContainer}>
                <Title text="Mentor Report" />
                <form onSubmit={generate} className={classes.form}>
                    <div className={classes.formContent}>
                        <div className={classes.formLeft}>
                            <p>Student Name</p>
                            <input
                                type="text"
                                value={studentName}
                                onChange={handleInputChange}
                            />
                            <p>CAS Experiences</p>
                            <textarea
                                rows="4"
                                value={casExperiences}
                                onChange={handleTextAreaChange}
                            />
                        </div>
                        <div className={classes.formRight}>
                            {[
                                "Communication",
                                "Collaboration",
                                "Critical Thinking",
                                "Creativity",
                                "Resilience",
                                "Perseverence",
                                "Self-Management",
                                "Social Awareness",
                                "Self-Awareness",
                                "Ethics"
                            ].map((skill, index) => (
                                <div
                                    key={index}
                                    className={classes.checkboxContainer}
                                >
                                    <input
                                        type="checkbox"
                                        name={skill
                                            .toLowerCase()
                                            .split(" ")
                                            .join("")}
                                        checked={
                                            skills[
                                                skill
                                                    .toLowerCase()
                                                    .split(" ")
                                                    .join("")
                                            ]
                                        }
                                        onChange={handleCheckboxChange}
                                    />
                                    <label>{skill}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button
                      IconComponent={FaIcons.FaLightbulb}
                      onClick={generate}
                      text="Generate"
                      buttonWidth="150px"
                      buttonHeight="50px"
                      type="submit"
                    />
                </form>
                <h2>Report</h2>
                { mentorReport && <p>{mentorReport}</p> }
                { !mentorReport && <p className={classes.warningText}>Enter your student's info and click generate to get started!</p> }
            </div>
    );
}

export default MentorReportPage;
