require('dotenv').config() // stores all key value pairs in dotenv in process.env
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_KEY } = process.env;

const mentorReportPrompt = require("../api/mentorReportPrompt");
const mindmapPrompt = require("../api/mindmapPrompt");
const curriculumPrompt = require("../api/curriculumPrompt");

const generateAIResponse = async (systemPrompt, userInput, additionalParams = {}) => {
    const configuration = new Configuration({
        apiKey: OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            {role: "system", content: systemPrompt},
            ...userInput,
        ],
        temperature: 0.7,
        max_tokens: additionalParams.maxTokens || 2000
    });

    return response.data.choices[0].message.content;
};

// EXAMPLE PAYLOAD
// {
//     "subject": "Computer Science",
//     "topic": "Topic 6 (Resource Management)",
//     "numOfQuestions": 10,
//     "syllabus": "Subtopic 1 Resource management:\n\nSystem resources:\n\n1.1\nAssessment Statement: Identify the resources that need to be managed within a computer system\nNotes: Resources include: primarymemory, secondary storage,processor speed, bandwidth, screenresolution, disk storage, soundprocessor, graphics processor, cache, network connectivity.\n\n1.2\nAssessment Statement: Evaluate the resources available in a variety of computer systems\nNotes: These should include: mainframes,servers, PCs, sub-laptops, as well aspersonal digital devices such as cellphones, PDAs and digital cameras. Develop an appreciationof the issues linked to resource availability with continued developments in computer systems.\n\n1.3\nAssessment Statement: Identify the limitations of a range of resources in a specified computer system\nNotes: For example, single processor computers may not be able to render 3D graphics effectively.\n\n1.4\nAssessment Statement: Describe the possible problems resulting from the limitations in the resources in a computer system\nNotes: For example, user time wasted if the primary memory is too small or processor speed inadequate. Multi-access and multi-programming environments should be considered as well as single-user systems.\n\nRole of the operating system:\n\n1.5\nAssessment Statement: Explain the role of the operating system in terms of managing memory, peripherals and hardware interfaces\nNotes: For example, allocating storage and keeping track of programs in memory, swapping between programs on time-slicing, priority or when one is waiting for input.\n\n1.7\nAssessment Statement: Outline OS resource management techniques: scheduling, policies, multitasking, virtual memory, paging, interrupt, polling\nNotes: Technical details as to how these are carried out will not be required, but it is expected that students will be familiar with these techniques and understand when and why they are used.\n\n1.8\nAssessment Statement: Discuss the advantages of producing a dedicated operating system for a device\nNotes: Advantages related to size, speed and customization should be considered. For example, using a dedicated operating system for a cell phone rather than using a pre-existing operating system.  Issue of proprietary software.\n\n1.9\nAssessment Statement: Outline how an operating system hides the complexity of the hardware from users and applications\nNotes: Students should be aware of a range of examples where operating systems virtualize real devices, such as drive letters, virtual memory, input devices, the Java virtual machine.  Issue of localization causing compatibility problems between systems in different countries.",
//     "template": "1.\nCommand Term: Describe\nMarks: 2\n\n2.\nCommand Term: Outline\nMarks: 2\n\n3.\nCommand Term: Define\nMarks: 2\n\n4.\nCommand Term: Describe\nMarks: 3\n\n5.\nCommand Term: Distinguish\nMarks: 3\n\n6.\nCommand Term: Outline\nMarks: 2\n\n7.\nCommand Term: Describe\nMarks: 3\n\n8.\nCommand Term: Identify\nMarks: 1\n\n9.\nCommand Term: Explain\nMarks: 4\n\n10.\nCommand Term: Outline\nMarks: 2",
//     "examples": "1. One of the functions of an operating system is memory management. Describe how this function prevents the system from crashing when more than one program is run at the same time. [2]\n\n2. Outline what is meant by virtual memory. [2]\n\n3. Define polling. [2]\n\n4. Describe one way that the operating system of a networked workstation hides the complexity of the network from the user. [3]\n\n5. Distinguish between the use of time slicing and priorities in the scheduling of processes by an operating system. [3]\n\n6. Outline the function of an interrupt. [2]\n\n7. Describe how an operating system uses paging when running a program. [3]\n\n8. Identify one advantage of using a dedicated operating system on a mobile phone. [1]\n\n9. Explain two functions that an operating system needs to perform in relation to multitasking. [4]\n\n10. Outline why single processor computers may not be able to render 3D graphics effectively. [2]"
// }
const mentorReport = async(req, res) => {
    try {
        const { studentName, casExperiences, skills } = req.body;

        if (!studentName || !casExperiences || !skills)
            return res.status (400).json ({ status: "ERROR", message: "All fields are required" });

        const { systemPrompt, exampleInput, exampleOutput } = mentorReportPrompt;
        const request = `Name: ${studentName}\nCAS Experiences: ${casExperiences}\nSkills and Qualities: ${skills}`;
        const userInput = [
            {role: "user", content: exampleInput},
            {role: "assistant", content: exampleOutput},
            {role: "user", content: request}
        ];

        const mentorReport = await generateAIResponse(systemPrompt, userInput, { maxTokens: 1000 });

        console.log ("Finished generating");

        res.status (200).json ({ status: "OK", message: "Finished writing mentor report", mentorReport });
    }
    catch (error) {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

const mindmap = async(req, res) => {
    try {
        const { input } = req.body;

        if (!input)
            return res.status (400).json ({ status: "ERROR", message: "Input is required" });

        const { systemPrompt } = mindmapPrompt;
        const userInput = [
            {role: "user", content: input}
        ];

        const mindmap = await generateAIResponse(systemPrompt, userInput);

        console.log ("Finished generating");

        res.status (200).json ({ status: "OK", message: "Finished generating mindmap markdown", mindmap });
    }
    catch (error) {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

const curriculum = async(req, res) => {
    try {
        const { unitTitle, weeks, strands } = req.body;

        if (!unitTitle || !weeks || !strands)
            return res.status (400).json ({ status: "ERROR", message: "All fields are required" });

        const { systemPrompt, exampleInput, exampleOutput } = curriculumPrompt;

        let request = `A maths teacher is creating a unit:\nUnit title: ${unitTitle}\nLength of Unit: ${weeks} weeks\n`

        // Loop through strands which is an array of strings and add them to the request
        strands.forEach((strand, index) => {
            request += `Strand ${index + 1}: ${strand}\n`
        });

        request += `Suggest an ${weeks} weeks unit planner, that includes conceptual understandings, benchmarks, and conceptual questions in each part.`

        const userInput = [
            {role: "user", content: exampleInput},
            {role: "assistant", content: exampleOutput},
            {role: "user", content: request}
        ];

        const curriculum = await generateAIResponse(systemPrompt, userInput, { maxTokens: 2000 });

        console.log ("Finished generating");

        res.status (200).json ({ status: "OK", message: "Finished writing curriculum", curriculum });
    }
    catch (error) {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}


module.exports = { mentorReport, mindmap, curriculum };
