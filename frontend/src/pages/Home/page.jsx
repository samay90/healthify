import { useContext } from "react";
import {greetings} from "../../static/constants"
import { userContext } from "../../store/User";
import moment from "moment";
import "../../styles/home.scss"
import Insights from "./Insights";
import FoodWarnings from "./FoodWarnings";
import FoodLogs from "./FoodLogs";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Plus } from "lucide-react";

const Home = () => {
    const {data:user} = useContext(userContext);
    const current_time = new Date().getHours();
    const greeting = greetings.find((g) => g.time_max > current_time);

    return <div className="page_in dashboard_page home_page">
        <div className="greetings">
            <div>
            <h1>{greeting.name}, {user.name.split(" ")[0]}!</h1>
            <p>{moment().format("dddd,  MMMM DD")}</p>
            </div>
            <div>
                <ButtonPrimary className={"button"} text={<><Plus color="white"/> Add Food</>}/>
            </div>
        </div>
        <Insights/>
        <FoodWarnings/>
        <FoodLogs date={moment().format("MM-DD-YYYY")}/>
    </div>
}

export default Home