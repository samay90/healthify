const auth = require("../../models/auth");
const lang = require("../../../lang/lang.json");
const bcrypt = require("bcryptjs");
const {checkEmail} = require("../../utils/checkers/cred");
const jwt = require("jsonwebtoken");

const signin = async (req,res) =>{
    const {email,password} = req.body;
    if (!checkEmail(email)){
        return res.status(400).json({
            error:true,
            message:lang["INVALID_EMAIL"]
        })
    }
    const userStatus = await auth.getUser(email);
    if (!!!userStatus.length){
        return res.status(400).json({
            error:true,
            message:lang["USER_NOT_FOUND"]
        })
    }
    const isPasswordCorrect = bcrypt.compareSync(password,userStatus[0].password);
    if (!isPasswordCorrect){
        return res.status(400).json({
            error:true,
            message:lang["INVALID_PASSWORD"]
        })
    }
    const token = jwt.sign({email:email,user_id:userStatus[0].user_id},process.env.SECRET_KEY,{expiresIn:"1d"});
    res.cookie("token",token,{httpOnly:true},{maxAge:24*60*60*1000});
    return res.status(200).json({
        error:false,
        message:"Welcome back!"
    })
}

module.exports = signin