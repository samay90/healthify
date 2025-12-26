const sharp = require('sharp');
const food = require('../../models/food');
const storage = require('../../utils/storage/files');
const {dbTimestamp} = require('../../utils/generators/time');
const { encode } = require('../../utils/generators/encode');

const addFood = async(req,res) =>{
    const {food_name,ingredients,calories,protein,carbs,fats,warnings} = req.body;
    const user = req.user;
    let food_url = null;
    const date = new Date();
    const time = date.getTime();
    if (req.files && req.files.image){
        const img = req.files.image;
        img.data = await sharp(img.data).resize(720, 720, {fit: "cover",position: "centre"}).png({ quality: 80 }).toBuffer();
        const url = await storage.uploadFile(img, `usr/${encode(user.user_id)}/foods/${time}.png`);
        food_url = url;
    }
    const result = await food.addFood(food_name,ingredients,calories,protein,carbs,fats,warnings,food_url,user.user_id,time);
    const db_date = date.toLocaleDateString('en-CA');
    const updateDailyLog = await food.updateDailyLogWithFood(user.user_id,calories,protein,carbs,fats,db_date);
    return res.status(200).json({
        error:false,
        message:"Food added successfully"
    })
}

module.exports = addFood;