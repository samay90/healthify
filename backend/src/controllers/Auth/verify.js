const crypto = require("crypto-js");
const lang = require("../../../lang/lang.json");
const client = require("../../utils/cache/redis");
const {checkEmail} = require("../../utils/checkers/cred");
const auth = require("../../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verify =async (req,res) =>{
    const {otp,token} = req.body;
    const email = crypto.AES.decrypt(token,process.env.SECRET_KEY).toString(crypto.enc.Utf8);
    if (!checkEmail(email)){
        return res.status(400).json({
            error:true,
            message:lang["UNAUTHORIZED"]
        })
    }
    const storedOtp =await client.get(`verify:${email}`);
    
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
    client.del(`verify:${email}`);
    const {name,password} = require("../../utils/generators/cred")(email);
    const hashedPassword = bcrypt.hashSync(password,10);
    const userStatus = await auth.createUser(email,name,hashedPassword);
    if (!userStatus){
        return res.status(400).json({
            error:true,
            message:lang["UNAVAILABLE"]
        })
    }
    const emailStatus = require("../../utils/mails/welcome")(name,email,password,process.env.CLIENT_URL+"/account/edit");
    if (!emailStatus){
        auth.forceDelete(email);
        return res.status(400).json({
            error:true,
            message:lang["UNAVAILABLE"]
        })
    }
    const accessToken = jwt.sign({email:email,user_id:userStatus.insertId},process.env.SECRET_KEY,{
        expiresIn:"30d"
    });
    res.cookie("token",accessToken,{httpOnly:true,maxAge:30*24*60*60*1000});
    return res.status(200).json({
        error:false,
        message:"Welcome onboard!"
    })
}

module.exports = verify