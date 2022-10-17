const UserModel = require("../Models/user.model");
const JobModel = require("../Models/job.model");
const FollowersModel = require("../Models/followers.model");

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
        const job = await JobModel.findOne({ _id: body.id });

        // checking if already applied
        for (let i of job.applicants_id) {
            if (i == user.id) {
                return res.status(400).json({
                    status: "error",
                    message: "Already applied",
                });
            }
        }

        // appending user to job list
        job.applicants_id.push(user);
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

const follow = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.email }).select("id");

        // check if user is already following
        const exists = await FollowersModel.findOne({
            user_id: user,
            company_id: req.body.id,
        });

        // unfollow if user is already following
        if (exists) {
            const x = await FollowersModel.findOneAndRemove(
                { user_id: user.id },
                { company_id: req.body.id }
            );
            return res.status(200).json({
                status: "unfollowed",
            });
        }

        // adding follow
        const follow = new FollowersModel();
        follow.user_id = user._id;
        follow.company_id = req.body.id;
        await follow.save();

        res.status(200).json({
            status: "success",
            user: follow,
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
    follow: follow,
};
