const Job = require("../Models/job.model");
const User = require("../Models/user.model");

const addJob = async (req, res) => {
    const { ...body } = req.body;

    try {
        const user = await User.findOne({ email: req.email }).select("id");
        // create a new job
        const job = new Job();
        job.company_id = user;
        job.title = body.title;
        job.description = body.description;
        job.major = body.major;

        await job.save();
        res.json({
            status: "success",
            job: job,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const reviewApplicants = async (req, res) => {
    try {
        const company = await User.findOne({ email: req.email }).select("id");

        // get company opend jobs
        const jobs = await Job.find({ company_id: company });
        let array_applicants = jobs[0].applicants_id;

        // get array of applicants ids
        for (let i = 0; i < jobs.length - 1; i++) {
            array_applicants = array_applicants.concat(
                jobs[i + 1].applicants_id
            );
        }

        // get all applicants
        const applicants = await User.find({
            _id: {
                $in: array_applicants,
            },
        });
        res.json({
            status: "success",
            job: applicants,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports = {
    addJob: addJob,
    reviewApplicants: reviewApplicants,
};
