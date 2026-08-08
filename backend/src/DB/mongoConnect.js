import mongoose from "mongoose"

export const dbConnect = async() => {
    try {
        return (await mongoose.connect(`${process.env.DB_CONNECT}${process.env.DB_NAME}`))
    } catch (error) {
        console.log("DB connection failed", error)
        console.log("server will shut down since no database found")
        process.exit(1) // exits ans quites wole server
    }
}