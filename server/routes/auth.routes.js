const { Router } = require("express");
const { login, signup } = require("../controllers/auth.controller");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
