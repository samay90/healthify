const analyseImage = require('../../utils/gen-ai/image');
const storage = require('../../utils/storage/files');
const { encode } = require('../../utils/generators/encode');
const lang = require("../../../lang/lang.json");

const detectFood = async (req,res)=>{
    if (!!!req.files || !!!req.files.image) {
        return res.status(400).json({ error: true, message: lang.IMAGE_REQUIRED });
    }
    const {image} = req.files;
    const filename = Date.now().toString();
    await storage.deleteFile(`usr/${encode(req.user.user_id)}/tmp/`);
    const url = await storage.uploadFile(image, `usr/${encode(req.user.user_id)}/tmp/${filename}.png`);
    const result = await analyseImage(url);
    if (result.error){
        return res.status(400).json({error:true,data:result});
    }
    return res.status(200).json({error:result.error,data:result});
}
module.exports = detectFood;