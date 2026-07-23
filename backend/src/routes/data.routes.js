import { Router } from "express";
import { addData } from "../controllers/data.controller.js";
import { authenticate } from "../middlewares/verifyJWT.js";

const dataRouter = Router()


dataRouter.route("/create-application").post(authenticate, addData)

export default dataRouter