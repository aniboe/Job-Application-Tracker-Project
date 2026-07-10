import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { ApiResponce } from "../utility/ApiResponse.js"
import { User } from "../models/user.models.js"
import mongoose from "mongoose"
import JWT from "jsonwebtoken"




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
        const hasUserCreated = await User.findById({_id: userAdded._id}).select("_id username email")

        if(!hasUserCreated) throw new ApiError(400, "some thing went wrong while registering user");
        
        // asigning cookie
        const token = JWT.sign(
            {
                _id: hasUserCreated._id,
                username: hasUserCreated.username,
                email: hasUserCreated.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.cookie("accessToken", token,{
            httpOnly: true,
            secure: true,
        })

        res
        .status(200)
        .json(
            new ApiResponce(
                200,
                {
                    _id: hasUserCreated._id,
                    username: hasUserCreated.username,
                    email: hasUserCreated.email                    
                },
                "user created successfully"
            )
        )
 
    }
)

const login = asyncHandler(
    async(req, res) =>{
        // we take email or username and password from frontend
        const {usernameOrEmail, password} = req.body
        
        // check if values are given

        if(
            [usernameOrEmail, password].some((val) => val?.trim() === "")
        ){
            throw new ApiError(400, "both are required")
        }

        // if the account exists in database
        const isUserRegistered = await User.findOne({
            $or: [
                {username: usernameOrEmail.toLowerCase()},
                {email: usernameOrEmail.toLowerCase()},
            ]
        })
        if(!isUserRegistered) throw new ApiError(400, "user is not registered")

        // if exists compare password 
        const passworCHeck = await isUserRegistered.isPasswordCorrect(password)

        if(!passworCHeck) throw new ApiError(400, "password or user incorrect")


        // after logged in send the cookie that expires after 1 month
        const token = JWT.sign(
            {
                _id: isUserRegistered._id,
                username: isUserRegistered.username,
                email: isUserRegistered.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.cookie("accessToken", token,{
            httpOnly: true,
            secure: true,
        })

        res
        .status(200)
        .json(
            new ApiResponce(
                200,
                {
                    username: isUserRegistered.username,
                    email: isUserRegistered.email
                },
                "logged in succesfully"
            )
        )

    }
)

export {
    registerUser,
    login
}