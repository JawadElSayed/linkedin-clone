const { Router } = require("express");
const { editProfile, getAllJobs, getJobById, searchForJob } = require("../controllers/user.controller");
const router = Router();

router.post("/edit_profile", editProfile);
router.get("/jobs", getAllJobs);
router.get("/job/:id", getJobById);
router.get("/search/:search", searchForJob);

module.exports = router;
