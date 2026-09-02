import { Router } from "express";
import { addData, deleteApplication, readAll, graphData, statusListProvider, updateApplication, allData, updateApplicationStatus } from "../controllers/data.controller.js";
import { authenticate } from "../middlewares/verifyJWT.js";

const dataRouter = Router()


dataRouter.route("/create-application").post(authenticate, addData)
dataRouter.route("/read-all-applications").get(authenticate, readAll)
dataRouter.route("/update-application/:id").patch(authenticate, updateApplication)
dataRouter.route("/update-status/:id").patch(authenticate, updateApplicationStatus)
dataRouter.route("/delete-application/:id").delete(authenticate, deleteApplication)
dataRouter.route("/get-status-list").get(authenticate, statusListProvider)
dataRouter.route("/get-graph-data").get(authenticate, graphData)
dataRouter.route("/get-all-data").get(authenticate, allData)

export default dataRouter