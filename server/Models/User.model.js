const { text } = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required",
    },
    email: {
        type: String,
        required: "email is required",
        trim: true,
        unique: true,
        lowercase: true,
    },
    major: {
        type: String,
        required: "major is required",
    },
    password: {
        type: String,
        required: "password is required",
        select: false,
    },
    user_type: {
        type: String,
        required: "type is required",
    },
    phone: {
        type: String,
    },
    cv: {
        type: String,
        default: null,
    },
    employe: {
        type: String,
    },
    bio: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    profile: {
        type: String,
    },
});

const model = mongoose.model("User", userSchema);

module.exports = model;
