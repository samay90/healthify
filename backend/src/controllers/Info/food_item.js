const lang = require('../../../lang/lang.json');
const info = require('../../models/info');
const { decode } = require('../../utils/generators/encode');

const get = async (req,res) =>{
    let {food_log_id} = req.params;
    food_log_id = decode(food_log_id);

    const user = req.user;
    const data = await info.getFoodDetails(user.user_id,food_log_id);
    return res.status(200).json({
        error: false,
        message: "",
        data: data.length > 0 ? data[0] : {}
    });

}

module.exports = get;