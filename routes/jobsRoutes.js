const express = require("express")
const userAuth = require("../middlewares/authMiddleware")
const {jobsController,getAllJobsController, updateJobController} = require("../controller/jobsController")

const router = express.Router()

// Job Creation -- POST
router.post("/create-job", userAuth, jobsController)

// Fetch listed jobs -- GET
router.get("/get-jobs", userAuth, getAllJobsController)

//update listed job --PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

module.exports = router