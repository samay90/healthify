import { useParams } from "react-router-dom"
import Calendar from "../../components/Calendar"
import { useEffect, useState } from "react";
import moment from "moment";
import WeekChart from "./WeekChart";
import "../../styles/Calendar.scss"
import Card from "../../components/Card";
const CalendarPage = () => {
    const [crr_date,setDate] = useState(false);
    const {date} = useParams();
    useEffect(()=>{
        const d = new Date(date);
        if (d.toString() === "Invalid Date") {
            setDate(moment().format("MM-01-YYYY"))
        }else{
            setDate(moment(date).format("MM-01-YYYY"))
        }
    })
    if (!crr_date) return <></>;
    return <div className="page_in calendar_page dashboard_page">
        <div className="greetings">
            <div>
            <h1>Calendar</h1>
            <p>View your nutrition history</p>
            </div>
        </div>
        <Card className="week_chart_card">
        <WeekChart/>
        </Card>
        <Calendar date={crr_date}/>
    </div>
}

export default CalendarPage