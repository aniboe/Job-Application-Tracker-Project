import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { ApiResponce } from "../utility/ApiResponse.js"
import { User } from "../models/user.models.js"
import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utility/cloudinary.js"
import { Data } from "../models/data.model.js"


const cookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days { cookies disapear after pc restarts thats why to check , might be some other issue}
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // same thing but diffrent syntax
}

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

        res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
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


        res
        .status(200)
        .cookie("accessToken", token, cookieOptions)

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

const logout = asyncHandler(
    async (req, res) => {
        const user = req.userData
        if(!user) throw new ApiError(400, "here? invalid token")
        
        res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json( new ApiResponce(
            200,
            "",
            "user successfully logged out"
        ))
    }
)

const me = asyncHandler(
    async (req, res) => {
        // get user data from athnticator
        const data = await req.userData
        
        // check if value exists
        if(!data) throw new ApiError(400, "could not find user ")

        // return value
        res
        .status(200)
        .json( new ApiResponce(
            200,
            {
                _id: data._id,
                username: data.username,
                avatar: data.avatar,
                email: data.email,
                publicId: data.publicId,
            },
            ""
        ))
    }
)

const addAvatar = asyncHandler(
    async (req, res) => {

        const user = req.userData
        if(!user) throw new ApiError(400, "invalid user")

        const localPath = req.file?.path
        if(!localPath) throw new ApiError(400, "could not find image in server")
            
        const cloudinaryResponse = await uploadOnCloudinary(localPath)
        if(!cloudinaryResponse) throw new ApiError(400, "something went wrong while uploading to cloudinary")

        const updateAvatar = await User.findByIdAndUpdate(
            user._id,
            {
                avatar: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            },
            {new: true}
        ).select("-password")
        
        res
        .status(200)
        .json(new ApiResponce(
            200,
            updateAvatar,
            "avatar has been updated successfully"
        ))
    }
)

const removeAvatar = asyncHandler(
    async (req, res) => {

        const user = req.userData
        if(!user) throw new ApiError(400, "invalid user")
        
    
        // learn how to remove image from cloudinary
        const isRemovedFromCloudinary = await deleteFromCloudinary(user.publicId)
        // console.log(isRemovedFromCloudinary);
        if(!isRemovedFromCloudinary) throw new ApiError("something went wrong while removing image from cloudinary");

        const updateAvatar = await User.findByIdAndUpdate(
            user._id,
            {
                avatar: "",
                publicId: "",
            },
            {new: true}
        ).select("-password")
        
        res
        .status(200)
        .json(new ApiResponce(
            200,
            updateAvatar,
            "avatar has been updated successfully"
        ))
    }
)

const updatUserName = asyncHandler(
    async (req, res) => {
        const user = req.userData
        if(!user) throw new ApiError(400, "invalid token")

        const newUserName = req.body?.newUserName

        // console.log(newUserName);
        
        if(!newUserName) throw new ApiError(400, "please enter username")

        const checkUser = await User.findOne({username: newUserName})
        if(checkUser) throw new ApiError(400, "username not avalable")
        
        const updateUserName = await User.findByIdAndUpdate(
            user._id,
            {
                username: newUserName
            },
            {new: true}
        ).select("-password -avatar -createdAt -updatedAt -__v -email")
        if(!updateUserName) throw new ApiError(400, "something went wrong while updating username")

        res
        .status(200)
        .json( new ApiResponce(
            200,
            updateUserName,
            "username updated successfully"
        ))
    }
)

const updatUserEmail = asyncHandler(
    async (req, res) => {
        const user = req.userData
        if(!user) throw new ApiError(400, "invalid token")

        const newUserEmail = req.body?.newUserEmail

        // console.log(newUserEmail);
        
        if(!newUserEmail) throw new ApiError(400, "please enter an email")

        const checkEmail = await User.findOne({email: newUserEmail})
        if(checkEmail) throw new ApiError(400, "email already in use")
        
        const updateUserEmail = await User.findByIdAndUpdate(
            user._id,
            {
                email: newUserEmail
            },
            {new: true}
        ).select("-password -avatar -createdAt -updatedAt -__v -username")
        if(!updateUserEmail) throw new ApiError(400, "something went wrong while updating email")

        res
        .status(200)
        .json( new ApiResponce(
            200,
            updateUserEmail,
            "username updated successfully"
        ))
    }
)

const updatUserPassword = asyncHandler(
    async (req, res) => {
        const user = req.userData
        if(!user) throw new ApiError(400, "invalid token")

        const { currentPassword, confirmPassword } = req.body
        
        if(!currentPassword || !confirmPassword ) throw new ApiError(400, "All fields are required")

        const findUserDetail = await User.findById(user._id).select("password")
        

        const isPasswordCorrect = await findUserDetail.isPasswordCorrect(currentPassword)
        

        if(!isPasswordCorrect) throw new ApiError(400, "invalid password")
        
        // const updateUserPassword = await User.findByIdAndUpdate( // this doessnt hash password because doesnt initiate "pre(save)" hook
        //     user._id,
        //     {
        //         password: confirmPassword
        //     },
        //     {new: true}
        // ).select(" -avatar -createdAt -updatedAt -__v -username -email")
        
        // updatinf this way
        findUserDetail.password = confirmPassword 
        const updateUserPassword = await findUserDetail.save() // this way initiats save hook
        if(!updateUserPassword) throw new ApiError(400, "something went wrong while updating password")

        res
        .status(200)
        .json( new ApiResponce(
            200,
            updateUserPassword,
            "password updated successfully"
        ))
    }
)

const deleteAccount = asyncHandler(
    async (req, res) => {
        // get user data 
        // remove user and data from data base using userid
        const user = req.userData
        if(!user) throw new ApiError(400, "invalid token")
            
        const { password } = req.body
        if(!password) throw new ApiError(400, "please enter your password")
            
        const userData = await User.findById(user._id)
        if(!userData) throw new ApiError(400, "could not find user")
            
        const isPasswordCorrect = userData.isPasswordCorrect(userData.password)
        if(!isPasswordCorrect) throw new ApiError(400, "wrong password")

        const deleteUser = await User.findByIdAndDelete(user._id)
        const deleteApplications = await Data.deleteMany({user: user._id})
        // if(!deleteUser || !deleteApplications) throw new ApiError(400, "account data deleted successfully") // !deleteApplications is always false — deleteMany returns { deletedCount: 0 } which is a truthy object
        if(!deleteUser || !deleteApplications.deletedCount === 0 ) throw new ApiError(400, "something went wrong while deleting account details") 
        res
        .status(200)
        .json(new ApiResponce(
            200,
            {
                deleteUser,
                deleteApplications
            },
            "account deleted successfully"
        ))
        
    }
)

export {
    registerUser,
    login,
    logout,
    me,
    addAvatar,
    removeAvatar,
    updatUserName,
    updatUserEmail,
    updatUserPassword,
    deleteAccount
}