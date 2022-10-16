const UserModel = require("../Models/user.model");
const JobModel = require("../Models/job.model");

const editProfile = async (req, res) => {
    const { id, ...data } = req.body;

    // update profile
    try {
        const user = await UserModel.findById(id);
        user.name = data.name;
        user.phone = data.phone;
        user.profile = data.profile;
        user.cv = data.cv;
        user.employe = data.employe;
        user.major = data.major;
        user.bio = data.bio;
        user.city = data.city;
        user.country = data.country;

        // save profile
        await user.save();
        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find();
        res.status(200).json({
            status: "success",
            user: jobs,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const getJobById = async (req, res) => {
    const id = req.params.id;
    try {
        const jobs = await JobModel.findById(id);
        res.status(200).json({
            status: "success",
            user: jobs,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const searchForJob = async (req, res) => {
    try {
        // search method
        const jobs = await JobModel.find({
            $or: [
                {
                    title: {
                        $regex: req.params.search,
                    },
                },
                {
                    major: {
                        $regex: req.params.search,
                    },
                },
            ],
        });

        res.status(200).json({
            status: "success",
            user: jobs,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const apply = async (req, res) => {
    const { ...body } = req.body;

    try {
        // finding user and job
        const user = await UserModel.findOne({ email: req.email }).select("id");
        const job = await JobModel.findOne({ id: body.id });

        // checking if already applied
        const id_exsit = await JobModel.exists({ applicats_id: user });
        if (id_exsit) {
            return res.status(400).json({
                status: "error",
                message: "already applied",
            });
        }

        // appending user to job list
        job.applicats_id.push(user);
        job.save();

        res.status(200).json({
            status: "success",
            user: job,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.email });
        res.status(200).json({
            status: "success",
            user: user,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports = {
    editProfile: editProfile,
    getAllJobs: getAllJobs,
    getJobById: getJobById,
    searchForJob: searchForJob,
    apply: apply,
    getUser: getUser,
};
