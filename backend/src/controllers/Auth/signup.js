const auth = require("../../models/auth");
const lang = require("../../../lang/lang.json");
const client = require("../../utils/cache/redis");
const {checkEmail} = require("../../utils/checkers/cred");
const crypto = require("crypto-js");
require("dotenv").config();

const signup =async (req,res) =>{
    const {email} = req.body;
    if (!checkEmail(email)){
        return res.status(400).json({
            error:true,
            message:lang["INVALID_EMAIL"]
        })
    }
    const uniqueStatus = await auth.checkUnique(email);
    if (uniqueStatus.flag){
        return res.status(400).json({
            error:true,
            message:lang["USER_ALREADY_EXISTS"]
        })
    }
    const otp = require("../../utils/generators/otp")();
    client.set(`verify:${email}`,otp);
    client.expire(`verify:${email}`,60*10);
    const mailStatus = require("../../utils/mails/otp")(email,otp);
    if (!mailStatus){
        return res.status(400).json({
            error:true,
            message:lang["UNAVAILABLE"]
        })
    }
    const verifyToken = crypto.AES.encrypt(email,process.env.SECRET_KEY).toString();
    return res.status(200).json({
        error:false,
        message:"Otp sent successfully",
        body:{
            token:verifyToken
        }
    })

}
module.exports = signup