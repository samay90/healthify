import { useContext } from "react";
import { userContext } from "../../store/User";
import Card from "../../components/Card";
import { Flame, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";
import { percentage } from "../../functions/percentage";
import {number} from "../../functions/number";
import CircularProgressBar from "../../components/CircularProgressBar";
import { getColor } from "../../functions/color";
import LinearProgressBar from "../../components/LinearProgressBar";
import Spinner from "../../components/Spinner";
import moment from "moment";

const Insights = ({total_food_items}) =>{
    const {data:user} = useContext(userContext);
    
    const {isLoading,data:insights} = useQuery({
        queryFn: () => api.get(`/info/nutrition/${moment().format("MM-DD-YYYY")}/${moment().format("MM-DD-YYYY")}`).then((res) => res.data),
        queryKey: ["insights",moment().format("MM-DD-YYYY")]
    })
    
    const {total_calories, total_carbs, total_fats, total_protein} = (insights?.data[0])??{};
    return (
        <div className="insights">
            <Card className="card_insight">
                {!isLoading?<><div className="title">
                    <span><Flame size={20} style={{stroke:"rgb(var(--accent-color))"}}/> <p>Calories Today</p></span>
                </div>
                <div className="visual">
                    <CircularProgressBar className="bar" progress={percentage(total_calories,user.daily_calorie_limit)}>
                        <h1>{number(total_calories)}</h1>
                        <p style={{color:"rgb(var(--text-primary))"}}>of {number(user.daily_calorie_limit)} kcal</p>
                        <p style={{color:getColor(percentage(total_calories,user.daily_calorie_limit)),marginTop:"10px"}}>{number(Math.max(0,user.daily_calorie_limit-total_calories))} left</p>
                    </CircularProgressBar>
                </div></>:<Spinner/>}
            </Card>
            <Card className="card_insight">
                {!isLoading?<><div className="title">
                    <span>Protein</span>
                    <span style={{color:"rgb(var(--primary-color))"}} className="per">{percentage(total_protein,user.daily_protein_limit)}%</span>
                </div>
                <div className="info">
                    <div className="stats">
                        <h2>{number(total_protein)}</h2>
                        <p>/ {number(user.daily_protein_limit)}g</p>
                    </div>
                    <LinearProgressBar color="--primary-color" progress={percentage(total_protein,user.daily_protein_limit)}/>
                </div></>:<Spinner/>}
            </Card>
            <Card className="card_insight">
                {!isLoading?<><div className="title">
                    <span>Carbs</span>
                    <span style={{color:getColor(percentage(total_carbs,user.daily_carbs_limit))}} className="per">{percentage(total_carbs,user.daily_carbs_limit)}%</span>
                </div>
                <div className="info">
                    <div className="stats">
                    <h2>{number(total_carbs)}</h2>
                    <p>/ {number(user.daily_carbs_limit)}g</p>
                    </div>
                    <LinearProgressBar progress={percentage(total_carbs,user.daily_carbs_limit)}/>
                </div></>:<Spinner/>}
            </Card>
            <Card className="card_insight">
                {!isLoading?<><div className="title">
                    <span>Fats</span>
                    <span style={{color:getColor(percentage(total_fats,user.daily_fats_limit))}} className="per">{percentage(total_fats,user.daily_fats_limit)}%</span>
                </div>
                <div className="info">
                    <div className="stats">
                        <h2>{number(total_fats)}</h2>
                        <p>/ {number(user.daily_fats_limit)}g</p>
                    </div>
                    <LinearProgressBar progress={percentage(total_fats,user.daily_fats_limit)}/>
                </div></>:<Spinner/>}
            </Card>
            <Card className="card_insight">
                {!isLoading?<><div className="title">
                    <span><TrendingUp size={16} color="rgb(var(--primary-color))"/> Daily Progress</span>
                </div>
                <div className="info food">
                    <h2>{total_food_items??0}</h2>
                    <p>meals logged today</p>
                </div></>:<Spinner/>}
            </Card>
        </div>
    )
}

export default Insights