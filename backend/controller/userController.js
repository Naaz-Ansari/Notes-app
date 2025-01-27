import { SendVerificationCode } from '../Email.js';
import UserData from '../model/user-model.js';

const userRegister = async (req, res) => {
    try {
        const { username, email, dob } = req.body;
        if(!username || !email || !dob) {
            return res.status(400).json({success: false, message:"All fields are required"})
        }
        const existUser = await UserData.findOne({email})
        if(existUser) {
            return res.status(400).json({success: false, message:"User already exist please login"})
        }
        
        const verficationcode = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new UserData({
            username, 
            email, 
            dob,
            verficationcode
        })
        await user.save()
        SendVerificationCode(user.email,user.verficationcode)
        return res.status(200).json({success:true, message: "User Registered Successfully", user})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

const verifyEmail = async(req, res) => {
    try {
        const code = req.body.otp
        const user = await UserData.findOne({
            verficationcode: code
        })
        if(!user) {
            return res.status(400).json({success:false, message:"Invalid or Expired Code."})
        }
        user.isVarified=true;
        // user.verficationcode=undefined;
        await user.save(); 
        return res.status(200).json({success:true, message: "Email Verified Successfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export default {userRegister, verifyEmail}