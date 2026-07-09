import express from "express"
const app = express()


// boiler plae
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))




import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user", userRouter)


export {app}