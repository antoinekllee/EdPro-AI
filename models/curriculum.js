const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
        required: true,
    },
    benchmark:
    {
        type: String,
        required: true,
    },
    conceptualQuestion:
    {
        type: String,
        required: true,
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

module.exports = model("Curriculum", schema);
