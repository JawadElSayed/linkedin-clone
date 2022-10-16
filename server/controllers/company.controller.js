const Job = require("../Models/job.model");

const addJob = async (req, res) => {
    const { ...body } = req.body;

    try {
        // create a new job
        const job = new Job();
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

module.exports = {
    addJob: addJob,
};
