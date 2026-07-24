import express from "express"
const app = express()
import cookieParser from "cookie-parser"

import cors from "cors"
app.use(cors(
    {
        origin: process.env.FRONTEND_ORIGN,
        credentials: true
    }
))


// boiler plae
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())





import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user", userRouter)

import dataRouter from "./routes/data.routes.js"
app.use("/api/v1/data", dataRouter)


// error handler middleware
app.use((err, req, res, next) => {
    console.log(err.message);

    return res
    .status(err.status || 500)
    .json(
        {
            success: false,
            message: err.message,
            errors: err.errors || []
        }
    )
})


export {app}