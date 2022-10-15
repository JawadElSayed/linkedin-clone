const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { name, email, password, major, user_type } = req.body;
    try {
        const user = new User();
        user.name = name;
        user.email = email;
        user.major = major;
        user.user_type = user_type;
        user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

module.exports = {
    signup,
};
