const { Router } = require("express");
const {
    editProfile,
    getAllJobs,
    getJobById,
    searchForJob,
    apply,
    getUser,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.post("/edit_profile", authMiddleware, editProfile);
router.get("/jobs", authMiddleware, getAllJobs);
router.get("/job/:id", authMiddleware, getJobById);
router.get("/search/:search", authMiddleware, searchForJob);
router.post("/apply", authMiddleware, apply);
router.get("/user", authMiddleware, getUser);

module.exports = router;
