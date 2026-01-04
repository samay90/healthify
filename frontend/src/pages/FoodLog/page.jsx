import moment from "moment"
import FoodLogs from "../Home/FoodLogs"
import { useState } from "react";
import "../../styles/food_log.scss"
const FoodLog = () => {
    const [date,setDate] = useState(moment().format("MM-DD-YYYY"));
    return <>
        <div className="food_log_page pageIn">
            <FoodLogs setTotal_food_items={()=>{}} date={date}/>
        </div>
    </>
}

export default FoodLog