import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";
import FoodCard from "../../components/FoodCard.jsx";
import "../../styles/food_logs.scss"
import { useEffect } from "react";

const FoodLogs = ({date,setTotal_food_items}) =>{
    const {data:foodLogs,isLoading} = useQuery({
        queryFn: () => api.get(`/info/foods/${date}`).then((res) => res.data),
        queryKey: ["foodLogs"]
    })
    useEffect(()=>{
        setTotal_food_items(foodLogs?.data?.length)
    },[foodLogs])
    return <div className="food_logs">
        <div className="header">
            <h2>Today's Meals</h2>
        </div>
        <div className="logs">
            {foodLogs?.data.map((log,key)=><FoodCard food={log} key={key}/>)}
        </div>
    </div>
}

export default FoodLogs;