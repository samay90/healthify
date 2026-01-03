const sharp = require('sharp');
const food = require('../../models/food');
const storage = require('../../utils/storage/files');
const {dbTimestamp} = require('../../utils/generators/time');
const { encode } = require('../../utils/generators/encode');

const addFood = async(req,res) =>{
    let {food_name,ingredients,calories,protein,carbs,fats,warnings} = req.body;
    ingredients = JSON.parse(ingredients);
    warnings = JSON.parse(warnings);
    const user = req.user;
    const date = new Date();
    const time = date.getTime();
    const result = await food.addFood(food_name,ingredients,calories,protein,carbs,fats,warnings,null,user.user_id,time);
    if (req.files && req.files.image){
        const img = req.files.image;
        img.data = await sharp(img.data).resize(720, 720, {fit: "cover",position: "centre"}).png({ quality: 80 }).toBuffer();
        const url = await storage.uploadFile(img, `usr/${encode(user.user_id)}/foods/${time}.png`);
        food.addFoodImage(result.insertId,url);
    }
    const db_date = date.toLocaleDateString('en-CA');
    const updateDailyLog = await food.updateDailyLogWithFood(user.user_id,calories,protein,carbs,fats,db_date);
    return res.status(200).json({
        error:false,
        message:"Food added successfully"
    })
}

module.exports = addFood;