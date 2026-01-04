import { useContext, useState } from "react";
import {greetings} from "../../static/constants"
import { userContext } from "../../store/User";
import moment from "moment";
import "../../styles/home.scss"
import Insights from "./Insights";
import FoodWarnings from "./FoodWarnings";
import FoodLogs from "./FoodLogs";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Plus, ScanHeart } from "lucide-react";
import { modalContext } from "../../store/modal";
import AddFoodModalContent from "../../components/AddFoodModalContent";
import ScanFoodModalContent from "../../components/ScanFoodModalContent";

const Home = () => {
    const {data:user} = useContext(userContext);
    const {openModal} = useContext(modalContext);
    const [total_food_items,setTotal_food_items] = useState(0);
    const current_time = new Date().getHours();
    const greeting = greetings.find((g) => g.time_max > current_time);

    return <div className="page_in dashboard_page home_page">
        <div className="greetings">
            <div>
            <h1>{greeting.name}, {user.name.split(" ")[0]}!</h1>
            <p>{moment().format("dddd,  MMMM DD")}</p>
            </div>
            <div>
                <ButtonPrimary onClick={()=>openModal(<ScanFoodModalContent/>)} className={"button"} text={<><ScanHeart color="white"/>&nbsp;&nbsp;Scan Food</>}/>
            </div>
        </div>
        <Insights total_food_items={total_food_items}/>
        <FoodWarnings/>
        <FoodLogs setTotal_food_items={setTotal_food_items} date={moment().format("MM-DD-YYYY")}/>
    </div>
}

export default Home