const jobModels = require("../model/jobModels");

const jobsController = async (req,res,next) => {
 const {company, position} = req.body
 if(!company || !position){
    next("Please provide all fields");
 }

 req.body.createdBy = req.user.userId
 const job = await jobModels.create(req.body)
 res.status(201).json({job})
};

// **********Find All Jobs******************//
const getAllJobsController = async (req, res, next) => {
    try {
        const jobs = await jobModels.find({ createdBy: req.user.userId }).lean();
        res.status(200).json({ 
            "Total Jobs": jobs.length,
            jobs 
        });
    } catch (error) {
        next(error);
    }
};

const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;

    if (!company || !position) {
        return next("Please provide all fields");
    }

    try {
        const job = await jobModels.findOne({ _id: id });

        if (!job) {
            return next(`No job found with id: ${id}`);
        }

        if (req.user.userId !== job.createdBy.toString()) {
            return next("Not authorized to modify this job");
        }

        const updatedJob = await jobModels.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

        res.status(200).json({ updatedJob });
    } catch (error) {
        next(error);
    }
};

module.exports = {jobsController,getAllJobsController, updateJobController}