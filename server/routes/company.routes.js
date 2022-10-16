const { Router } = require("express");
const { addJob } = require("../controllers/company.controller");
const router = Router();

router.post("/add_job", addJob);

module.exports = router;
