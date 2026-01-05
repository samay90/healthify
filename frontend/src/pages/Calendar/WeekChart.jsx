import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";
import { getWeekEnds } from "../../functions/week";
import moment from "moment";
import Card from "../../components/Card";
import { Beef, Droplets, Flame, TrendingUp, Wheat } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../store/User";
import { number } from "../../functions/number";
import { percentage } from "../../functions/percentage";
const WeekChart = () => {
  const [data, setData] = useState({});
  const [field, setField] = useState("total_calories");
  const [startDate, endDate] = getWeekEnds();
  
  const { data: week_data, isLoading } = useQuery({
    queryFn: () =>
      api.get(`/info/nutrition/${moment(startDate).format("MM-DD-YYYY")}/${moment(endDate).format("MM-DD-YYYY")}`).then((res) => res.data),
    queryKey: ["week-nutrition", moment(startDate).format("MM-DD-YYYY")],
  });
  
  const user = useContext(userContext);
  const {
    daily_calorie_limit: total_calories,
    daily_carbs_limit: total_carbs,
    daily_fats_limit: total_fats,
    daily_protein_limit: total_protein,
  } = user?.data;
  const limits = { total_calories, total_carbs, total_fats, total_protein };
  const options = [
    {
      label: <><Flame/> Calories</>,
      value: "total_calories",
      color: "var(--accent-color)",
    },
    {
      label: <><Wheat/> Carbs</>,
      value: "total_carbs",
      color: "var(--warning)",
    },
    {
      label: <><Droplets/> Fats</>,
      value: "total_fats",
      color: "var(--info)",
    },
    {
      label: <><Beef/> Protein</>,
      value: "total_protein",
      color: "var(--primary-color)",
    },
  ]
  useEffect(() => {
    if (week_data?.data) {
      let obj = {};
      for (let nut of week_data.data) {
        obj[moment(nut.intake_date).format("ddd")] = nut;
      }
      setData(obj);
    }
  }, [week_data]);  
  
  return (
    <>
      <div className="week_chart">
        <div className="title">
          <TrendingUp /> This Week
        </div>
        
        <div className="graph">
          {Array.from({ length: 7 }).map((_, key) => {
            const day = moment(startDate)
              .add(key, "days")
              .format("ddd");
            return (
              <div key={key} className="bar" style={{"--color":options.find((opt)=>opt.value==field)?.color}}>
                <p className="label">{day}</p>
                <div className="bar_cover">
                    <div
                    className="bar_item"
                    style={{
                        height: `${percentage(data[day]?.[field], limits[field])}%`,
                    }}
                    ></div>
                </div>
                <p className="value">
                  {data[day] && data[day]?.[field] != 0
                    ? `${number(data[day]?.[field])}${
                        field == "total_calories" ? " kcal" : "g"
                      }`
                    : "-"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="options">
            {options.map((opt,key)=>{
                return <div style={{"--color":opt.color}} key={key} className={`option ${field==opt.value?"active":""}`} onClick={()=>setField(opt.value)}>{opt.label}</div>
            })}
        </div>
      </div>
    </>
  );
};

export default WeekChart;
