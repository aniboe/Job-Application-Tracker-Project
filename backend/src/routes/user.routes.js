import { Router } from "express";
import { login,
    registerUser,
    me,
    addAvatar,
    updatUserName,
    updatUserEmail,
    updatUserPassword,
    logout, removeAvatar,
    deleteAccount,
    sendOtp,
    verifyOtp} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(logout)
userRouter.route("/me").get(authenticate ,me)
userRouter.route("/add-avatar").put(authenticate , upload.single('avatar') , addAvatar)
userRouter.route("/remove-avatar").put(authenticate , removeAvatar)
userRouter.route("/update-username").post(authenticate , updatUserName)
userRouter.route("/update-email").post(authenticate , updatUserEmail)
userRouter.route("/update-password").post(authenticate , updatUserPassword)
userRouter.route("/delete-account").post(authenticate , deleteAccount)
userRouter.route("/send-otp").post(sendOtp)
userRouter.route("/verify-otp").post(verifyOtp)

export default userRouter