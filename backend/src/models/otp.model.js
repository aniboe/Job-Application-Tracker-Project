import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"

const otpSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
            required: true
        },
        expiresAt:{
            type: Date,
            required: true,
            expires: 0
        }
    }
)

// hash otp
otpSchema.pre("save", async function(){
    if(this.isModified("otp")){
        this.otp = await bcrypt.hash(this.otp, 10)  
    }
})

// make verificatio function
otpSchema.methods.isOtpCorrect = async function(entredOtp){
    return await bcrypt.compare(entredOtp, this.otp)
}



export const Otp = mongoose.model("otp", otpSchema)