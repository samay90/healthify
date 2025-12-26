const food = require('../../models/food');
const storage = require('../../utils/storage/files');

const addFood = async(req,res) =>{
    const {food_name,ingredients,calories,protein,carbs,fats,warnings} = req.body;
    const user = req.user;
    const food_url = null;
    if (req.files && req.files.image){
        const url = await storage.uploadFile(req.files.image, `usr/${user.user_id}/foods/${Date.now()}.png`);
        food_url = url;
    }
    const result = await food.addFood(food_name,ingredients,calories,protein,carbs,fats,warnings,food_url,user.user_id);
    const date = new Date();
    const db_date = date.toLocaleDateString('en-CA');
    const updateDailyLog = await food.updateDailyLogWithFood(user.user_id,calories,protein,carbs,fats,db_date);
    return res.status(200).json({
        error:false,
        message:"Food added successfully",
        data:[result,updateDailyLog]
    })
}

module.exports = addFood;