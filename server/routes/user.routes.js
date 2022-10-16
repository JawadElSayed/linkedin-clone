const { Router } = require("express");
const { editProfile } = require("../controllers/user.controller");
const router = Router();

router.post("/edit_profile", editProfile);

module.exports = router;
