import express from "express"
const app = express()
import cookieParser from "cookie-parser"

import cors from "cors"

const frontendOrigin = process.env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGN || true
// when behind a proxy (like Render) and using secure cookies, enable trust proxy
if(process.env.NODE_ENV === "production"){
    app.set('trust proxy', 1)
}

console.log("CORS origin:", frontendOrigin)
app.use(cors({
    origin: frontendOrigin,
    credentials: true
}))


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