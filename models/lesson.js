const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = new Schema({
    curriculum: {
        type: Schema.Types.ObjectId,
        ref: "Curriculum",
        required: true,
    },
    week: {
        type: String, // Number
        required: true,
    },
    conceptualUnderstanding: {
        type: String,
        required: true,
    },
    benchmark: {
        type: String,
        required: true,
    },
    conceptualQuestion: {
        type: String,
        required: true,
    },
    lessonPlan: {
        type: [String],
        required: true,
    }
});

module.exports = model("Lesson", schema);
