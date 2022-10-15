const { text } = require("express");
const mongoose = require("mongoose");

exports.userSchema = mongoose.Schema({
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
    phone: {
        type: String,
        required: "phone is required",
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
    cv: {
        type: String,
        default: null,
    },
    employe: {
        type: String,
    },
    magor: {
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
    }
});

const model = mongoose.model("User", userSchema);

module.exports = model;
