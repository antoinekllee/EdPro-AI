const curriculumModel = require("../models/curriculum"); 
const lessonModel = require("../models/lesson");

const getCurriculums = async(req, res) =>
{
    try
    {
        const userId = req.session.userId; 

        if (!userId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "User not logged in" 
            });

        const curriculums = await curriculumModel.find({ user: userId });

        res.status(200).json({ 
            status: "OK", 
            message: "Curriculums retrieved successfully", 
            curriculums 
        }); 
    }
    catch (error)
    {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

const newCurriculum = async(req, res) =>
{
    try
    {
        const { subject, unitTitle, weeks, strands, lessonItems } = req.body; 

        if (!subject || !unitTitle || !weeks || !strands || !lessonItems)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "Subject, unit title, weeks, and strands are all required" 
            });

        const userId = req.session.userId; 

        if (!userId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "User not logged in" 
            });

        const newCurriculum = await curriculumModel.create({ 
            user: userId, 
            subject, 
            unitTitle, 
            weeks, 
            strands
        }); 

        lessons = [];
        for (let i = 0; i < lessonItems.length; i++)
        {
            const { week, conceptualUnderstanding, benchmark, conceptualQuestion } = lessonItems[i];

            const lesson = await lessonModel.create({
                curriculum: newCurriculum._id,
                week,
                conceptualUnderstanding,
                benchmark,
                conceptualQuestion,
            });

            lessons.push(lesson._id);
        }

        // Update the curriculum with the lessons
        newCurriculum.lessons = lessons;
        await newCurriculum.save();

        res.status(200).json({ 
            status: "OK", 
            message: "New curriculum created successfully", 
            curriculum: newCurriculum
        }); 
    }
    catch (error)
    {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

module.exports = { newCurriculum, getCurriculums }; 