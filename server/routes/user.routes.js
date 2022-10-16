const { Router } = require("express");
const { editProfile, getAllJobs, getJobById } = require("../controllers/user.controller");
const router = Router();

router.post("/edit_profile", editProfile);
router.get("/jobs", getAllJobs);
router.get("/job/:id", getJobById);

module.exports = router;
