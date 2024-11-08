import { ChangeEvent, FC, useEffect, useState } from "react";
import { ReactComponent as NextDate } from "@/assets/nextDate.svg";
import { ReactComponent as PrevDate } from "@/assets/prevDate.svg";
import { DAYS_OF_WEEK, MONTHS } from "@/contexts/Calendar.ts";

interface CalendarProps {
  onChange: (date: Date) => void;
  date?: Date;
  navSide?: "left" | "right";
}

const Calendar: FC<CalendarProps> = ({ onChange, date, navSide }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(
    date ? date.getDate() : null
  );
  useEffect(() => {
    if (date) {
      setCurrentDate(date);
      setSelectedDay(date.getDate());
    }
  }, [date]);
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDay(day);
    onChange(newDate);
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(
      currentDate.setMonth(parseInt(event.target.value))
    );
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(
      currentDate.setFullYear(parseInt(event.target.value))
    );
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Previous month days
    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthDaysCount = getDaysInMonth(prevMonthYear, prevMonth);

    for (
      let i = prevMonthDaysCount - prevMonthDays + 1;
      i <= prevMonthDaysCount;
      i++
    ) {
      days.push(
        <div
          key={`prev-${i}`}
          className="day-cell previous-month"
          style={{ color: "rgba(207, 207, 207, 1)" }}
        >
          {i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(year, month, i).getDay();
      const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;

      days.push(
        <div
          key={i}
          className={`day-cell ${isWeekend ? "weekend" : ""} ${
            selectedDay === i ? "selected" : ""
          }`}
          onClick={() => handleDateClick(i)}
          style={{
            backgroundColor:
              selectedDay === i ? "rgba(194, 232, 255, 1)" : "transparent",
          }}
        >
          {i}
        </div>
      );
    }

    // Next month days
    const nextMonthDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="day-cell next-month"
          style={{ color: "rgba(207, 207, 207, 1)" }}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="header">
        {navSide === "left" && (
          <button
            className="nav-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <PrevDate />
          </button>
        )}
        <select
          className="select"
          value={currentDate.getMonth()}
          onChange={handleMonthChange}
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={currentDate.getFullYear()}
          onChange={handleYearChange}
        >
          {Array.from(
            { length: 10 },
            (_, i) => currentDate.getFullYear() - 5 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {navSide === "right" && (
          <button
            className="nav-button"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          >
            <NextDate />
          </button>
        )}
      </div>
      <div className="week-days">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className={`week-day ${
              day === "Сб" || day === "Вс" ? "weekend" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
