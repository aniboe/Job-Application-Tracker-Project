import bcrypt from "bcrypt"
import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
        }
    },
    {timestamps: true}
)

// making a password hashing method here so everytime passwor is changed we update it automatically

UserSchema.pre("save" , async function(){ // link to doc for .pre(middlewares): https://mongoosejs.com/docs/middleware.html
    if(!this.isModified("password")) return // here is doc for more like isModified: https://mongoosejs.com/docs/8.x/docs/api/document.html

    this.password = await bcrypt.hash(this.password, 10) // it needs await since it takes some time, otherwise pushes raw password
})



// method to compare curent password with preexisting password
// this is doc link fro "method" : https://mongoosejs.com/docs/8.x/docs/api/schema.html

UserSchema.methods.isPasswordCorrect = function(password){ // here is doc link : https://mongoosejs.com/docs/7.x/docs/guide.html
    return bcrypt.compare(password, this.password) // this.password is getting hashed pass from the called object
} 



export const User = mongoose.model("User", UserSchema) // "User" inide this model() is what this uder database folder will be called 