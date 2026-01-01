const lang = require('../../../lang/lang.json');
const info = require('../../models/info');

const get = async (req,res) =>{
    const {start_date,end_date} = req.params;
    const sd = new Date(start_date);
    const ed = new Date(end_date);

    if (sd==="Invalid Date" || ed==="Invalid Date"){
        return res.status(400).json({
            error:true,
            message: lang.INVALID_DATE
        });
    }
    const db_start_date = sd.toLocaleDateString('en-CA');
    const db_end_date = ed.toLocaleDateString('en-CA');
    const user = req.user;
    const data = await info.getNutritionInfoByDate(user.user_id,db_start_date,db_end_date);
    return res.status(200).json({
        error: false,
        message: "",
        data: data
    });

}

module.exports = get;