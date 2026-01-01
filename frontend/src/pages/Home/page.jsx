import { useContext } from "react";
import {greetings} from "../../static/constants"
import { userContext } from "../../store/User";
import moment from "moment";
import "../../styles/home.scss"
import Insights from "./Insights";

const Home = () => {
    const {data:user} = useContext(userContext);
    const current_time = new Date().getHours();
    const greeting = greetings.find((g) => g.time_max > current_time);

    return <div className="page_in dashboard_page home_page">
        <div className="greetings">
            <h1>{greeting.name}, {user.name.split(" ")[0]}!</h1>
            <p>{moment().format("dddd,  MMMM DD")}</p>
        </div>
        <Insights/>
        <FoodWarnings/>
    </div>
}

export default Home