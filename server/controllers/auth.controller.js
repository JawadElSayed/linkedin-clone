const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    // check input
    if (!user)
        return res.status(401).json({
            status: "error",
            message: "incorrect email or password",
        });

    // checking password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({
            status: "error",
            message: "incorrect email or password",
        });

    const token = jwt.sign(
        { email: user.email, name: user.name, user_type: user.user_type },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h",
        }
    );
    res.status(200).json(token);
};

module.exports = {
    signup,
    login,
};
