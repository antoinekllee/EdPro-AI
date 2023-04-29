import React, { useState, useContext } from "react";

import classes from "./MentorReportPage.module.css";
import * as FaIcons from "react-icons/fa";

import LoadingContext from "../store/LoadingContext";

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
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data.mentorReport); 
    setMentorReport (data.mentorReport); 

    setIsLoading(false);
  };

  return (
    <div>
      <div className={classes.mainContainer}>
        <h1 className={classes.title}>Mentor Report</h1>
        <form onSubmit={generate} className={classes.form}>
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
            {["Communication", "Collaboration", "Critical Thinking", "Creativity", "Resilience"].map(
              (skill, index) => (
                <div key={index} className={classes.checkboxContainer}>
                  <input
                    type="checkbox"
                    name={skill.toLowerCase().split(" ").join("")}
                    checked={skills[skill.toLowerCase().split(" ").join("")]}
                    onChange={handleCheckboxChange}
                  />
                  <label>{skill}</label>
                </div>
              )
            )}
          </div>
          <button type="submit">
            <FaIcons.FaLightbulb className={classes.buttonIcon} />
            Generate
          </button>
          { mentorReport && <p>{mentorReport}</p> }
        </form>
      </div>
    </div>
  );
}

export default MentorReportPage;






// import React, { useState, useContext, useEffect } from "react";

// import classes from "./MentorReportPage.module.css";

// import * as FaIcons from "react-icons/fa";

// import LoadingContext from "../store/LoadingContext";

// function FormPage(props) {
//     const { setIsLoading } = useContext(LoadingContext);

//     const [topic, setTopic] = useState("");

//     const [subject, setSubject] = useState("");
//     const [level, setLevel] = useState("SL");
//     const [topicOptions, setTopicOptions] = useState([]);
//     const [topics, setTopics] = useState([]);

//     useEffect(() => {
//         const getTopics = async () => {
//             setIsLoading(true);

//             const response = await fetch("/subject/topics", {
//                 headers: { "Content-Type": "application/json" },
//                 method: "POST",
//                 body: JSON.stringify({ subjectName: subject }),
//             });

//             const data = await response.json();

//             if (data.status === "ERROR")
//                 console.log(
//                     "Error getting topics from subject: " + data.message
//                 );
//             else {
//                 const options = data.topics.map((topic, index) => (
//                     <option
//                         value={index + 1}
//                         key={index}
//                         disabled={topic.hl_only && level !== "HL"}
//                     >
//                         {topic.name}
//                     </option>
//                 ));
//                 setTopicOptions(options);

//                 setTopics(data.topics);
//                 // updateTopicOptions();
//             }

//             setIsLoading(false);
//         };

//         if (subject) getTopics();
//     }, [subject, setIsLoading]);

//     const updateTopicOptions = () => {
//         const options = topics.map((topic, index) => (
//             <option
//                 value={index + 1}
//                 key={index}
//                 disabled={topic.hl_only && level === "HL"}
//             >
//                 {topic.name}
//             </option>
//         ));
//         setTopicOptions(options);
//     };

//     const selectSubject = (event) => {
//         setSubject(event.target.value);
//     };

//     const selectLevel = (event) => {
//         setLevel(event.target.value);
//         updateTopicOptions();
//     };

//     const selectTopic = (event) => {
//         console.log(event.target.value);
//         setTopic(event.target.value);
//     };

//     const getTemplate = async () =>
//         // get template and questions from server
//         {
//             const response = await fetch("/outlines/topic", {
//                 headers: { "Content-Type": "application/json" },
//                 method: "POST",
//                 body: JSON.stringify({ topic, numOfQuestions: 10 }), // TODO: get number of questions from user
//             });

//             const data = await response.json();

//             if (data.status === "ERROR")
//                 console.log(
//                     "Error getting outlines from subject: " + data.message
//                 );
//             else return { template: data.template, examples: data.examples };
//         };

//     const getSyllabus = async () =>
//         // get syllabus from server
//         {
//             const response = await fetch("/syllabus/topic", {
//                 headers: { "Content-Type": "application/json" },
//                 method: "POST",
//                 body: JSON.stringify({ topic }),
//             });

//             const data = await response.json();

//             if (data.status === "ERROR")
//                 console.log(
//                     "Error getting syllabus from subject: " + data.message
//                 );
//             else return data.syllabus;
//         };

//     const generate = async (
//         event // send data to question display page
//     ) => {
//         event.preventDefault();

//         if (!topic) return;

//         setIsLoading(true);

//         const { template, examples } = await getTemplate();
//         const syllabus = await getSyllabus();

//         const state = {
//             subject,
//             level,
//             topic: topics[topic - 1].name,
//             numOfQuestions: 10,
//             syllabus,
//             template,
//             examples,
//         };
//         props.fade("/questions", state);
//     };

//     return (
//         <div>
//             <div className={classes.mainContainer}>
//                 <h1 className={classes.title}>Generate</h1>
//                 <form onSubmit={generate} className={classes.form}>
//                     <p>Subject</p>
//                     <select defaultValue={"Select"} onChange={selectSubject}>
//                         <option value="Select" disabled>
//                             Select
//                         </option>
//                         <option value="Computer Science">
//                             Computer Science
//                         </option>
//                         <option value="Economics">Economics</option>
//                     </select>
//                     <p>Level</p>
//                     <select defaultValue={"SL"} onChange={selectLevel}>
//                         <option value="SL">SL</option>
//                         <option value="HL">HL</option>
//                     </select>
//                     <p>Topic</p>
//                     <select defaultValue={"Select"} onChange={selectTopic}>
//                         <option value="Select" disabled>
//                             Select Topic
//                         </option>
//                         {topicOptions}
//                     </select>
//                     <button type="submit">
//                         <FaIcons.FaLightbulb className={classes.buttonIcon} />
//                         Generate
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default FormPage;
