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

const getCurriculumById = async(req, res) =>
{
    try
    {
        const userId = req.session.userId; 

        if (!userId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "User not logged in" 
            });

        const curriculum = await curriculumModel.findOne({ user: userId, _id: req.params.id });

        if (!curriculum)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "Curriculum not found" 
            });

        const lessons = await lessonModel.find({ curriculum: curriculum._id });

        res.status(200).json({ 
            status: "OK", 
            message: "Curriculum retrieved successfully", 
            curriculum: { ...curriculum._doc, lessons }
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
        const { subject, unitTitle, week, strands, lessonItems } = req.body; 

        if (!subject || !unitTitle || !week || !strands || !lessonItems)
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
            week, 
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

// Update a lesson given lesson id by replacing all its fields
// Fields are week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength, lessonPlan, lessonId
const updateLesson = async(req, res) =>
{
    try
    {
        const { week, conceptualUnderstanding, benchmark, conceptualQuestion, numClasses, classLength, lessonPlan, lessonId } = req.body;

        if (!week || !conceptualUnderstanding || !benchmark || !conceptualQuestion || !numClasses || !classLength || !lessonPlan || !lessonId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "All fields are required" 
            });

        const userId = req.session.userId;

        if (!userId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "User not logged in" 
            });

        // Try find the lesson
        const lesson = await lessonModel.findOne({ _id: lessonId });

        if (!lesson)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "Lesson not found" 
            });

        // Update the lesson
        lesson.week = week;
        lesson.conceptualUnderstanding = conceptualUnderstanding;
        lesson.benchmark = benchmark;
        lesson.conceptualQuestion = conceptualQuestion;
        lesson.numClasses = numClasses;
        lesson.classLength = classLength;
        lesson.lessonPlan = lessonPlan;
        await lesson.save();

        res.status(200).json({ 
            status: "OK", 
            message: "Lesson updated successfully", 
            lesson
        }); 
    }
    catch (error)
    {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

const getLessonById = async(req, res) =>
{
    try
    {
        const userId = req.session.userId; 

        if (!userId)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "User not logged in" 
            });

        const lesson = await lessonModel.findOne({ _id: req.params.id });

        if (!lesson)
            return res.status(400).json({ 
                status: "ERROR", 
                message: "Lesson not found" 
            });

        res.status(200).json({ 
            status: "OK", 
            message: "Lesson retrieved successfully", 
            lesson
        });
    }
    catch (error)
    {
        console.error (error);
        res.status (500).json ({ status: "ERROR", message: "Server error" });
    }
}

module.exports = { newCurriculum, getCurriculums, getCurriculumById, updateLesson, getLessonById }; 