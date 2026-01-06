import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";
import FoodCard from "../../components/FoodCard.jsx";
import "../../styles/food_logs.scss"
import { useEffect } from "react";
import { queryClient } from "../../main.jsx";
import Empty from "../../components/Empty/index.jsx";
import Card from "../../components/Card/index.jsx";

const FoodLogs = ({date,setTotal_food_items,noTitle,search=""}) =>{
    const {data:foodLogs,isLoading} = useQuery({
        queryFn: () => api.get(`/info/foods/${date}`).then((res) => res.data),
        queryKey: ["foodLogs",date]
    })
    useEffect(()=>{
            queryClient.invalidateQueries({ queryKey: ["foodLogs"] });
    },[date])
    useEffect(()=>{
        setTotal_food_items(foodLogs?.data?.length)
    },[foodLogs])
    return <div className="food_logs">
        {
            !noTitle?<div className="header">
            <h2>Today's Meals</h2>
        </div>:""
        }
        <div className="logs">
            {foodLogs?.data.filter((item)=>item.food_name.toLowerCase().includes(search.toLowerCase())).map((log,key)=><FoodCard food={log} key={key}/>)}
        </div>
        {
            (foodLogs?.data.length===0 || isLoading)?<Card className="empty_card">
                <Empty isLoading={isLoading} text={"No Meals."}/>
            </Card>:null
        }
    </div>
}

export default FoodLogs;