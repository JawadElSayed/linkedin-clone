const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const authMiddleware = async (req, res, next) => {
    // if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.email = decoded.email;
        const user = await User.findOne({ email: decoded.email }).lean();
        req.user = { ...user };
        next();
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }
};

module.exports = authMiddleware;
