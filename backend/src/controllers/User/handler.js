const express = require('express');
const router = express.Router();
const authorize = require('../../utils/middleware/authorize');
const validate = require('../../utils/middleware/validate');
const schema = require('../../../body_schema/schema.json');
const {updateInfo,updateProfilePic} = require('./update');
const analyseImage = require('../../utils/gen-ai/image');
const storage = require('../../utils/storage/files');
const { encode } = require('../../utils/generators/encode');
const { detectFood } = require('../../utils/vision/config');
router.post("/update",authorize,validate(schema["user"]["update"]),updateInfo,updateProfilePic);

router.post("/detect-image",authorize,async (req,res)=>{
    const {image} = req.files;
    await storage.deleteFile(`usr/${encode(req.user.user_id)}/foods/_.png`);
    const url = await storage.uploadFile(image, `usr/${encode(req.user.user_id)}/foods/_.png`);
    const result = await analyseImage(req.body.url);
    return res.status(200).json(result);
})
module.exports = router;