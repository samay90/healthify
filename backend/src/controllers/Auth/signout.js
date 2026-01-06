const signout = async(req,res) =>{
    res.clearCookie("token");
    res.send({
        error:false,
        message:"Signed out successfully",
        data:{}
    })
}
module.exports = signout