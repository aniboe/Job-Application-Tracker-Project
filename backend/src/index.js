import dotenv from 'dotenv'
dotenv.config({path: ".env"})


import {app} from "./server.js"
import {dbConnect} from "./DB/mongoConnect.js"


const port = process.env.PORT || 3000
console.log(port);



// call the function to execute when server iniates
dbConnect()
    .then((value) => {
        // console.log(value) // lots of data
        app.get("/",(req , res ) => {
            res.json(`server is runing on http://localhost:${port}/`)
        })

        app.listen(port,() => {
            console.log(`server is runing on http://localhost:${port}/`);
            
        })
    })
    .catch((err) => {
        console.log( err || "something went wrong while connecting to database")
    })



app.listen(3000)