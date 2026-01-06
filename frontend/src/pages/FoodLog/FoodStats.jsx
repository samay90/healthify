import { useQuery } from "@tanstack/react-query"
import Card from "../../components/Card";
import api from "../../api/client";
import { number } from "../../functions/number";
import { useEffect } from "react";
import { queryClient } from "../../main";
import Spinner from "../../components/Spinner";
const FoodStats = ({date}) => {
    const {data:stats,isLoading} = useQuery({
        queryFn: () => api.get(`/info/nutrition/${date}/${date}`).then((res) => res.data),
        queryKey: ["insights",date]
    })
    const {total_calories, total_carbs, total_fats, total_protein} = (stats?.data[0])??{};
    return <>
        <div className="food_stats_log">
            <Card>
                {
                    isLoading?<div style={{height:"3rem"}}>
                        <Spinner/>
                    </div>:<>
                    <div className="stats">
                    <div style={{"--color":"var(--text-dark)"}}>
                        <h3>{number(total_calories)} kcal</h3>
                        <p>Calories</p>
                    </div>
                    <div style={{"--color":"var(--primary-color)"}}>
                        <h3>{number(total_protein)}g</h3>
                        <p>Protein</p>
                    </div>
                    <div style={{"--color":"var(--warning)"}}>
                        <h3>{number(total_carbs)}g</h3>
                        <p>Carbs</p>
                    </div>
                    <div style={{"--color":"var(--accent-color)"}}>
                        <h3>{number(total_fats)}g</h3>
                        <p>Fats</p>
                    </div>
                </div>
                    </>
                }
            </Card>
        </div>
    </>
}

export default FoodStats