import mongoose, { Schema } from "mongoose"

const DataSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
        },
        company: {
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
        salary: {
            type: String,
        },
        link: {
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