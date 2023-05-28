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
    // title: {
    //     type: String,
    //     required: true,
    // },
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
    // Array of activities. Activities are objects with a title and description
    // activities: [
    //     {
    //         title: {
    //             type: String,
    //             required: true,
    //         },
    //         description: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ]
});

module.exports = model("Lesson", schema);
