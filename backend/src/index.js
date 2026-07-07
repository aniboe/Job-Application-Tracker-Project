import express from "express"

const app = express()

app.get("/",(req , res ) => {
    res.json("this is a test")
})

app.listen(3000)