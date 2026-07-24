import mongoose, { Schema } from "mongoose"

const DataSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        companyName: {
            type: String,
            requiredL: true
        },
        role: {
            type: String,
            require: true,
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
        },
        status: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)

export const Data = mongoose.model("Data", DataSchema)