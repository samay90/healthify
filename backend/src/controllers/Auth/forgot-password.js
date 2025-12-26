const auth = require("../../models/auth");
const generateOTP = require("../../utils/generators/otp.js");
const lang = require("../../../lang/lang.json");
const {checkEmail} = require("../../utils/checkers/cred");
const crypto = require("crypto-js");
const client = require("../../utils/cache/redis.js");
require("dotenv").config();

const forgotPassword = async (req,res) =>{
    const {email} = req.body;
    if (!checkEmail(email)){
        return res.status(400).json({
            error:true,
            message:lang["INVALID_EMAIL"]
        })
    }
    const userStatus = await auth.findUser(email);
    if (!!!userStatus.length){
        return res.status(400).json({
            error:true,
            message:lang["USER_NOT_FOUND"]
        })
    }
    const code = generateOTP();
    const resetLink = process.env.CLIENT_URL+"/reset-password/"+crypto.AES.encrypt(email,process.env.SECRET_KEY).toString()+"/"+code;
    const mailStatus = require("../../utils/mails/reset-password.js")(email,userStatus[0].name,resetLink);
    if (!mailStatus){
        return res.status(400).json({
            error:true,
            message:lang["UNAVAILABLE"]
        })
    }
    client.set(`reset:${email}`,code);
    client.expire(`reset:${email}`,60*10);
    return res.status(200).json({
        error:false,
        message:"Reset Link sent."
    })
}   

module.exports = forgotPassword