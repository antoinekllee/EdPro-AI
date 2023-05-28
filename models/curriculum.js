const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    unitTitle: {
        type: String,
        required: true,
    },
    weeks: {
        type: Number,
        required: true,
    },
    strands: {
        type: [String],
        required: true,
    },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
});

module.exports = model("Curriculum", schema);
