const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
{
    company: {
        type: String,
        required: [true, "Provide company name"]
    },
    position: {
        type: String,
        required: [true, "Provide job position"]
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "interview", "accepted"],
        default: "pending"
    },
    workType:{
        type: String,
        enum: ["full-time", "part-time", "internship", "contract-based"],
        default: "full-time"
    },
    workLocation:{
        type: String,
        default: "Mumbai",
        required: [true, "Please provide a work location"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
}
)

module.exports = mongoose.model('Job', jobSchema);