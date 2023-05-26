require('dotenv').config() // stores all key value pairs in dotenv in process.env
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_KEY } = process.env;

const mentorReportPrompt = require("../prompts/mentorReportPrompt");
const mindmapPrompt = require("../prompts/mindmapPrompt");
const curriculumPrompt = require("../prompts/curriculumPrompt");

const generateAIResponse = async (messages, model="gpt-3.5-turbo", additionalParams = {}) => {
    const configuration = new Configuration({
        apiKey: OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: additionalParams.maxTokens || 2000
    });

    return response.data.choices[0].message.content;
};

const mentorReport = async(req, res) => {
    try {
        const { studentName, casExperiences, skills } = req.body;

        if (!studentName || !casExperiences || !skills)
            return res.status (400).json ({ status: "ERROR", message: "All fields are required" });

        let promptMessages = mentorReportPrompt.prompt.split("<<MESSAGE_SEPARATOR>>");

        let messages = [
            { "role": "system", "content": promptMessages[0] }
        ];

        for (let i = 1; i < promptMessages.length; i++) {
            let role = (i % 2 == 1) ? "user" : "assistant";
            messages.push({ "role": role, "content": promptMessages[i] });
        }

        const request = `STUDENT NAME:\n${studentName}\n\nPERSONALITY: ${skills}\n\nCAS:\n${casExperiences}`;
        messages.push({ "role": "user", "content": request });

        console.log (messages);

        const mentorReport = await generateAIResponse(messages, "gpt-3.5-turbo", { maxTokens: 1000 });

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
