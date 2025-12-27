const info = require("../../models/info.js");

const get = async (req,res) =>{
    const user = req.user;
    const d = new Date();
    const start_time = new Date(d.setHours(0,0,0,0));
    const end_time = new Date(d.setHours(23,59,59,999));
    const insights = await info.getNutritionInsights(user.user_id,start_time.getTime(),end_time.getTime());
    let warnings = [];
    let mp = new Map();
    const length = insights.length;
    for (let i=0;i<length;i++){
        const item = insights[i].warnings;
        for (let j=0;j<item.length;j++){
            if (mp.has(item[j]["warning_text"])){
                warnings[mp.get(item[j]["warning_text"])]["count"] += 1;
            }else{
                warnings.push({
                    ...item[j],
                    count: 1
                });
                mp.set(item[j]["warning_text"],warnings.length-1);
            }
        }
    } 
    return res.status(200).json({
        error:false,
        message:"",
        data:warnings
    });
}
module.exports = get;