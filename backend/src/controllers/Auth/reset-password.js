const crypto = require("crypto-js");
const lang = require("../../../lang/lang.json");
const client = require("../../utils/cache/redis");
const {checkEmail} = require("../../utils/checkers/cred"); 
const auth = require("../../models/auth");
const bcrypt = require("bcryptjs");

const resetPassword = async (req,res) =>{
    const {token,otp,password} = req.body;
    const email = crypto.AES.decrypt(token,process.env.SECRET_KEY).toString(crypto.enc.Utf8);
    if (!checkEmail(email)){
        return res.status(400).json({
            error:true,
            message:lang["UNAUTHORIZED"]
        })
    }
    const storedOtp =await client.get(`reset:${email}`);
    
    if (!!!storedOtp){
        return res.status(400).json({
            error:true,
            message:lang["OTP_EXPIRED"]
        })
    }
    if (storedOtp != otp){
        return res.status(400).json({
            error:true,
            message:lang["INVALID_OTP"]
        })
    }
    client.del(`reset:${email}`);
    const hashedPassword = bcrypt.hashSync(password,10);
    const userStatus = await auth.updatePassword(email,hashedPassword);
    const time = new Date();
    require("../../utils/mails/password-changed")(email,time);
    if (!userStatus){
        return res.status(400).json({
            error:true,
            message:lang["UNAVAILABLE"]
        })
    }
    return res.status(200).json({
        error:false,
        message:"Password reset successfully"
    })
}

module.exports = resetPassword;