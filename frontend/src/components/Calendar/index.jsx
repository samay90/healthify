import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import Pagination from '../Pagination';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Flame, LogIn } from 'lucide-react';
import { userContext } from '../../store/User';
import { percentage } from '../../functions/percentage';
import { getColor } from '../../functions/color';
const Calendar = ({date}) => {
  const [currentDate, setCurrentDate] = useState(new Date(date));  
  useEffect(()=>{
    setCurrentDate(new Date(date));
  },[date])
  if (!currentDate) return <></>;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const {data:user} = useContext(userContext);
  const total_calories_limit = user?.daily_calorie_limit;
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const today = new Date();
  const navigate = useNavigate();
  const [nutritions,setNutritions] = useState({});
  const prevMonth = () => {
    const newDate = moment(date).subtract(1,"months").format("MM-DD-YYYY");
    navigate("/dashboard/calendar/"+newDate)
  }
  const nextMonth = () => {
    const newDate = moment(date).add(1,"months").format("MM-DD-YYYY");
    navigate("/dashboard/calendar/"+newDate)
  }

  const {data:raw_nutritions,isLoading} = useQuery({
    queryFn: async () =>
      {
        
        const startDate = moment(date).format("MM-01-YYYY");
        const endDate = moment(date).format(`MM-${daysInMonth}-YYYY`);
        return api.get(`/info/nutrition/${startDate}/${endDate}`).then((res) => res.data)
      },
    queryKey: ["nutrition", moment(date).format("MM-YYYY")],
  })

  useEffect(()=>{
    if (!raw_nutritions) return;
    const raw_data = raw_nutritions.data;
    let obj = {};
    for (let nt of raw_data) {
      obj[moment(nt.intake_date).format("MM-DD-YYYY")] = nt;
    }
    setNutritions(obj);
  },[raw_nutritions])
  
  const renderDays = () => {
    const dayElements = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dayElements.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = 
      d === today.getDate() && 
      month === today.getMonth() && 
      year === today.getFullYear();
      
      const crr_date = moment(date).format(`MM-${d<10?0:""}${d}-YYYY`);
      dayElements.push(
        <div style={{"--color":nutritions[crr_date]?getColor(percentage(nutritions[crr_date].total_calories,total_calories_limit),0.1):"none"}} key={d} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <p>{d}</p>
          {
            nutritions[crr_date]?<span>
            <Flame size={14}/> {percentage(nutritions[crr_date].total_calories,total_calories_limit)}%
          </span>:""
          }
        </div>
      );
    }
    return dayElements;
  };

  return (
    <div className="calendar-container">
      <Pagination onNext={nextMonth} onPrevious={prevMonth} >
        <h3 className='header_text'>{moment(date).format("MMMM YYYY")}</h3>
      </Pagination>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-label">{day}</div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;