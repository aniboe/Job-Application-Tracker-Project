import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { ApiResponce } from "../utility/ApiResponse.js"
import { User } from "../models/user.models.js"
import mongoose from "mongoose"


const registerUser = asyncHandler(
    async (req, res) => {
        const {username , email, password} = req.body

        // check if all values are passed
        if(
            [username, email, password].some((val) => val?.trim() === "") // "some" gives true if even one value check true
        ){
            throw new ApiError(400, "all fields are required")
        }

        // check if username already exists
        const userExists = await User.findOne(
            {
                $or: [ // mongo or operator
                    {username},
                    {email}
                ]
            }
        )

        if(userExists) throw new ApiError(400, "username or email already registered")

        // if all values exist and it dont exists in database then push the values in database
        const userAdded = await User.create(
            {
                username,
                email,
                password,
            }
        )

        // we can do thid because user provides whole object , so we can check if that user exists in db
        const hasUserCreated = await User.findById({_id: userAdded._id}).select("username email")

        if(!hasUserCreated) throw new ApiError(400, "some thing went wrong while registering user")

        res
        .status(200)
        .json(
            new ApiResponce(
                200,
                hasUserCreated,
                "user created successfully"
            )
        )
 
    }
)


export {
    registerUser
}