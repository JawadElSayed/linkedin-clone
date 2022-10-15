const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    applicats_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const model = mongoose.model("Job", jobSchema);

module.exports = model;
