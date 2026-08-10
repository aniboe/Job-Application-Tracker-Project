import { Router } from "express";
import { login, registerUser, me } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/verifyJWT.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(login)
userRouter.route("/me").get(authenticate ,me)

export default userRouter