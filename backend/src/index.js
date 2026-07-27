/*
NOTE:----------------------------
import dotenv from 'dotenv'
dotenv.config({path: ".env"})

PROBLEM:
    problem with this method is that, if we are using "env" variables inside other file
    like "server.js", then "server" initiates faster then "env" could and it creates "timing issue"
    because of that "server" file imports before "env" and "server" doesnt get access to "env" variables

NOTE: if we are uding this method

    import dotenv from 'dotenv'
    dotenv.config({path: ".env"})

    then we use either of the solution 

        1: { import 'dotenv/config' } // this is faster then those two line above


        2: if u want to use those two line then import server and other file with await statement

            const { app } = await import("./server.js"); // import statement with await
            const { dbConnect } = await import("./DB/mongoConnect.js");

            
The main takeaway:

    with ES modules, remember that import statements are evaluated before normal code runs,
    so environment loading order can matter. 

    Using import "dotenv/config" or a dynamic import after dotenv.config() are good solutions.
-------------------------------------
*/

import 'dotenv/config' // this is faster than above two line as long as env file is at right location

import {app} from "./server.js"
import {dbConnect} from "./DB/mongoConnect.js"


const port = process.env.PORT || 3000



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