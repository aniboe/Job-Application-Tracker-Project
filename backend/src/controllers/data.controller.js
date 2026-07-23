import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { Data } from "../models/data.model.js"

// create data controller

const addData = asyncHandler(
    async (req, res) => {
        const {companyName, role, location, salary, companyLink, status} = req.body

        // checkif all fields are available 
        if(
            [comanyName, role, location, salaryRange, companyLink, status].some((val) => !val || val.trim() === "")
        ){
            throw new ApiError(400, "all fields are required")
        }

        // we dont have to check if similar value exists
        // so we just add this into data base

        const addedData = await Data.create

    }
)

export {
    addData
}