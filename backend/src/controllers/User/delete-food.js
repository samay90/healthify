const food = require('../../models/food');
const lang = require('../../../lang/lang.json');
const files = require('../../utils/storage/files');
const { encode, decode } = require('../../utils/generators/encode');

const deleteFood = async(req,res) =>{
    let {food_log_id} = req.body;
    food_log_id = decode(food_log_id);
    const user = req.user;
    const foodDetail = await food.getFoodDetail(food_log_id,user.user_id);
    if (foodDetail.length === 0){
        return res.status(404).json({
            error:true,
            message:lang.FOOD_LOG_NOT_FOUND
        });
    }
    const log_date = foodDetail[0].created_at;
    const date = new Date(parseInt(log_date));
    const db_date = date.toLocaleDateString('en-CA');
    await files.deleteFile(`usr/${encode(user.user_id)}/foods/${log_date}.png`);
    await food.reduceDailyLogWithFood(user.user_id,foodDetail[0].calories,foodDetail[0].protein,foodDetail[0].carbs,foodDetail[0].fats,db_date);
    await food.deleteFoodLog(food_log_id,user.user_id);
    return res.status(200).json({
        error:false,
        message:"Food deleted successfully"
    })
};

module.exports = deleteFood;