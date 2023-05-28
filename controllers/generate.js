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

        console.log ("Generating mentor report");
        console.log (request);

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
        const { subject, unitTitle, weeks, strands } = req.body;

        if (!subject || !unitTitle || !weeks || !strands)
            return res.status (400).json ({ status: "ERROR", message: "All fields are required" });

        let promptMessages = curriculumPrompt.prompt.split("<<MESSAGE_SEPARATOR>>");

        let messages = [
            { "role": "system", "content": promptMessages[0] }
        ];

        for (let i = 1; i < promptMessages.length; i++) {
            let role = (i % 2 == 1) ? "user" : "assistant";
            messages.push({ "role": role, "content": promptMessages[i] });
        }

        const request = `A ${subject} teacher is creating a unit:\nUnit title: ${unitTitle}\nLength of units: ${weeks} weeks\n${strands}\nSuggest a ${weeks} week unit planner, that includes conceptual understandings, benchmarks, and conceptual questions in each part.`;
        messages.push({ "role": "user", "content": request });

        console.log ("Generating curriculum");
        console.log (request);

        const curriculum = await generateAIResponse(messages, "gpt-3.5-turbo", { maxTokens: 1000 });

        console.log (curriculum)

        try
        {
            // Break the curriculum string into an array, using two newlines as the separator
            const curriculumBlocks = curriculum.split('\n\n');
                    
            // Process the blocks into the desired format
            const lessonItems = curriculumBlocks.map(block => {
                const lines = block.split('\n');
                const week = lines[0].split(': ')[1]; // split by the first colon and take the second part
                const conceptualUnderstanding = lines[1].split(': ')[1]; // split by the first colon and take the second part
                const benchmark = lines[2].split(': ')[1]; // split by the first colon and take the second part
                const conceptualQuestion = lines[3].split(': ')[1]; // split by the first colon and take the second part
            
                return {
                    week,
                    conceptualUnderstanding,
                    benchmark,
                    conceptualQuestion,
                };
            });

            console.log (lessonItems)
            res.status (200).json ({ status: "OK", message: "Finished writing curriculum", lessonItems });
        }
        catch (error)
        {
            console.error (error);
            res.status (500).json ({ status: "ERROR", message: "Could not parse curriculum" });
        }

        console.log ("Finished generating");
    }
    catch (error) {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}


module.exports = { mentorReport, mindmap, curriculum };
