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

if(process.env.NODE_ENV === "production"){ // for production
    app.set("trust proxy", 1) 
}




import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user", userRouter)

import dataRouter from "./routes/data.routes.js"
app.use("/api/v1/data", dataRouter)


// error handler middleware
app.use((err, req, res, next) => {
    console.error(err.message);

    const statusCode = err.statuscode || err.status || 500
    return res
    .status(statusCode)
    .json(
        {
            success: false,
            message: err.message,
            errors: err.errors || []
        }
    )
})


export {app}