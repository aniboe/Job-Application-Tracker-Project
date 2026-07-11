import JWT from "jsonwebtoken"
import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { User } from "../models/user.models.js"

export const authenticate = asyncHandler(
    // async (err, req, res, next) => {
    async (req, res, next) => {
        // get cookie from brouser
        const token = await req.cookies?.accessToken
        // console.log(token)

        // check if cookies are available
        if(!token) throw new ApiError(400, "invalid cookie")

        // if yes then verify using JWT and extract data from jwt 
        const decodedJWT = await JWT.verify(token, process.env.JWT_SECRET)

        if(!decodedJWT) throw new ApiError(400, "invalid token")

        // check if asociated data exists in database
        const isUserInDB = await User.findById({_id: decodedJWT._id}).select("-password -createdAt -updatedAt -__v")
        if(!isUserInDB) throw new ApiError(400, "invalid token")

        // if everything works fine send user in req.userData as res to controler
        req.userData = isUserInDB
        next() // this next is important
    } 
)

