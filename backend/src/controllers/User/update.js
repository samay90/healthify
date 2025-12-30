const auth = require("../../models/auth");
const lang = require("../../../lang/lang.json");
const storage = require("../../utils/storage/files");
const {encode} = require("../../utils/generators/encode");
const sharp = require("sharp");

const updateInfo = async (req, res,next) => {
    const {name,delete_pic,daily_calorie_limit,daily_protein_limit,daily_carbs_limit,daily_fats_limit} = req.body;
    const user = req.user;
    await auth.updateUserInfo(user.user_id,name,delete_pic,daily_calorie_limit,daily_protein_limit,daily_carbs_limit,daily_fats_limit);
    const userInfo = await auth.getUserById(user.user_id, user.email);
    req.user = userInfo[0];
    next();
};
const updateProfilePic = async (req, res) => {
    const user = req.user;
    const files = req.files;
    if (!!!files || (!!!files.profile) || (files.profile.length>1)){
        return res.status(200).json({
            error: false,
            message: "Success",
            user: user
        });
    }
    const profilePic = files.profile;
    if (profilePic.mimetype.split("/")[0]!="image"){
        return res.status(400).json({
            error:true,
            message: lang["INVALID_PIC_TYPE"]
        });
    }
    const new_img_buffer = await sharp(profilePic.data).resize(512, 512, {
        fit: "cover",
        position: "centre"
    })
    .png({ quality: 80 })
    .toBuffer();  
    profilePic.data = new_img_buffer;
    await storage.deleteFile(`usr/${encode(user.user_id)}/prf/`);
    const filename = Date.now().toString();
    const fileUrl = await storage.uploadFile(profilePic, `usr/${encode(user.user_id)}/prf/${filename}.png`);
    const updatedUser = await auth.updateProfile(user.user_id, fileUrl);
    const userInfo = await auth.getUserById(user.user_id, user.email);
    req.user = userInfo;
    return res.status(200).json({
        error: false,
        message: "Success",
        user: userInfo
    });
    
}
module.exports = {updateInfo,updateProfilePic};