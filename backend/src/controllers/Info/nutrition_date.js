const lang = require('../../../lang/lang.json');
const info = require('../../models/info');

const get = async (req,res) =>{
    const {date} = req.params;
    const d = new Date(date);
    if(isNaN(d.getTime())){
        return res.status(400).json({
            error:true,
            message: lang.INVALID_DATE
        });
    }
    const db_date = d.toLocaleDateString('en-CA');
    const user = req.user;
    const data = await info.getNutritionInfoByDate(user.user_id,db_date);
    if (data.length === 0) {
        return res.status(404).json({
            error: false,
            message: "",
            data: {
                total_calories: 0,
                total_proteins: 0,
                total_carbs: 0,
                total_fats: 0,
            }
        });
    }
    return res.status(200).json({
        error: false,
        message: "",
        data: data[0]
    });

}

module.exports = get;