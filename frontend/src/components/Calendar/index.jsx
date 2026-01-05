import React, { useState } from 'react';
import './style.scss';

const Calendar = ({date}) => {
  const [currentDate, setCurrentDate] = useState(new Date(date));  
  if (!currentDate) return <></>;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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

      dayElements.push(
        <div key={d} className={`calendar-day ${isToday ? 'today' : ''}`}>
          {d}
        </div>
      );
    }
    return dayElements;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

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