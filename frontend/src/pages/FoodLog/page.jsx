import moment from "moment"
import FoodLogs from "../Home/FoodLogs"
import { useEffect, useState } from "react";
import "../../styles/food_log.scss"
import Search from "../../components/Search";
import FoodStats from "./FoodStats";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
const FoodLog = () => {
    const [search,setSearch] = useState("");
    const {date} = useParams();
    const navigate = useNavigate();
    const [crr_date,setDate] = useState(false);
    useEffect(()=>{
        const d = new Date(date);
        console.log(d);
        
        if (d.toString() === "Invalid Date") {
            navigate("/dashboard/food-log/"+moment().format("MM-DD-YYYY"))
        }else{
            setDate(moment(date).format("MM-DD-YYYY"))
        }
    },[date])
    if (!crr_date) return <></>;

    const nextPage = () => {
        navigate("/dashboard/food-log/"+moment(crr_date).add(1,"days").format("MM-DD-YYYY"))
    }
    const previousPage = () => {
        navigate("/dashboard/food-log/"+moment(crr_date).subtract(1,"days").format("MM-DD-YYYY"))
    }
    return <>
        <div className="food_log_page page_in dashboard_page">
            <div className="greetings">
                <div>
                <h1>Food Log</h1>
                <p>Track and manage your daily meals</p>
                </div>
            </div>
            <Pagination onNext={nextPage} onPrevious={previousPage}>
                <div className="page_holder">
                    <h3>{moment(crr_date).format("ddd, MMM DD")}</h3>
                    {
                        moment(crr_date).format("ddd, MMM DD")!==moment().format("ddd, MMM DD")?<p onClick={()=>navigate("/dashboard/food-log/"+moment().format("MM-DD-YYYY"))}> Go to today</p>:""
                    }
                </div>
            </Pagination>
            <FoodStats date={crr_date}/>
            <Search search={search} setSearch={setSearch}/>
            <FoodLogs search={search} noTitle setTotal_food_items={()=>{}} date={crr_date}/>
        </div>
    </>
}

export default FoodLog