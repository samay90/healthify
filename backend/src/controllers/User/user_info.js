const {encode} = require("../../utils/generators/encode");
const get = (req,res) =>{
    return res.status(200).json({
        error:false,
        message:"",
        data:{...req.user,user_id:encode(req.user.user_id)}
    });
}
module.exports = get;