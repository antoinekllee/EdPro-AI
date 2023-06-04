const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = new Schema({
    curriculum: {
        type: Schema.Types.ObjectId,
        ref: "Curriculum",
        required: true,
    },
    week:
    {
        type: String,
        required: true,
    },
    conceptualUnderstanding:
    {
        type: String,
        required: false,
    },
    benchmark:
    {
        type: String,
        required: false,
    },
    conceptualQuestion:
    {
        type: String,
        required: false,
    },
    numClasses:
    {
        type: Number,
        required: false,
    },
    classLength:
    {
        type: Number,
        required: false,
    },
    lessonPlan:
    {
        type: String,
        required: false,
    }
});

module.exports = model("Lesson", schema);
