const { Router } = require("express");
const { editProfile, getAllJobs } = require("../controllers/user.controller");
const router = Router();

router.post("/edit_profile", editProfile);
router.get("/jobs", getAllJobs);

module.exports = router;
