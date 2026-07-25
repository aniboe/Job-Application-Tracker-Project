import mongoose, { Schema } from "mongoose"
import { APPLICATION_STATUS } from "../constants/statusOptions.js"

const DataSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        companyName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        salaryRange: {
            type: String,
        },
        companyLink: {
            type: String,
            required: true,
            lowercase: true,
        },
        status: {
            type: String,
            enum: APPLICATION_STATUS,
            default: APPLICATION_STATUS[0],
            required: true,
        }
    },
    {timestamps: true}
)

export const Data = mongoose.model("Data", DataSchema)