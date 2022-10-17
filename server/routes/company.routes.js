const { Router } = require("express");
const { addJob, reviewApplicants } = require("../controllers/company.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.post("/add_job", authMiddleware, addJob);
router.get("/review_applicants", authMiddleware, reviewApplicants);

module.exports = router;
