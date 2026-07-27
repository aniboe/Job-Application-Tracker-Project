import { Router } from "express";
import { addData, deleteApplication, readAll, sendStatusCount, statusListProvider, updateApplication } from "../controllers/data.controller.js";
import { authenticate } from "../middlewares/verifyJWT.js";

const dataRouter = Router()


dataRouter.route("/create-application").post(authenticate, addData)
dataRouter.route("/read-all-applications").get(authenticate, readAll)
dataRouter.route("/update-application/:id").patch(authenticate, updateApplication)
dataRouter.route("/delete-application/:id").delete(authenticate, deleteApplication)
dataRouter.route("/get-status-list").get(authenticate, statusListProvider)
dataRouter.route("/get-status-count").get(authenticate, sendStatusCount)

export default dataRouter