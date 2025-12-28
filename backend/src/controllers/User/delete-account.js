const auth = require("../../models/auth");

const deleteAccount =async (req,res) =>{
    const {user_id } = req.user;
    await auth.deleteAccount(user_id);
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
        error:false,
        message:"Account deleted successfully"
    })
}

module.exports = deleteAccount