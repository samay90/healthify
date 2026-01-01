const lang = require('../../../lang/lang.json');
const info = require('../../models/info');
const { encode } = require('../../utils/generators/encode');

const get = async (req,res) =>{
    const {date} = req.params;
    const d = new Date(date);
    if(d==="Invalid Date"){
        return res.status(400).json({
            error:true,
            message: lang.INVALID_DATE
        });
    }
    const start_time = new Date(d.setHours(0,0,0,0));
    const end_time = new Date(d.setHours(23,59,59,999));
    const db_date = d.toLocaleDateString('en-CA');
    const user = req.user;
    const data = await info.getFoodItemsByDate(user.user_id,start_time.getTime(),end_time.getTime());
    return res.status(200).json({
        error: false,
        message: "",
        data: data.map(item=>({...item,food_log_id:encode(item.food_log_id)}))
    });

}

module.exports = get;