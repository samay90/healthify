const food = require('../../models/food');
const lang = require('../../../lang/lang.json');

const deleteFood = async(req,res) =>{
    const {food_log_id} = req.body;
    const user = req.user;
    const foodDetail = await food.getFoodDetail(food_log_id,user.user_id);
    if (foodDetail.length === 0){
        return res.status(404).json({
            error:true,
            message:lang.FOOD_LOG_NOT_FOUND
        });
    }
    const log_date = foodDetail[0].created_at;
    const date = new Date(log_date);
    const db_date = date.toLocaleDateString('en-CA');
    await food.reduceDailyLogWithFood(user.user_id,foodDetail[0].calories,foodDetail[0].protein,foodDetail[0].carbs,foodDetail[0].fats,db_date);
    await food.deleteFoodLog(food_log_id,user.user_id);
    return res.status(200).json({
        error:false,
        message:"Food deleted successfully"
    })
};

module.exports = deleteFood;