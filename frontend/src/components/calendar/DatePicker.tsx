import { useState, useEffect } from 'react';
import useDateStore from '@/stores/DateStore';
import {
  padding0,
  isSameDay,
  isCurrentMonth,
  dateToString,
} from '@/utils/DateUtils';
import {
  DateWrapper,
  DateButton,
  Chevrons,
} from '@/components/calendar/DatePicker.styled';
import ChevronLeft from '@/assets/icons/chevronLeft.svg';
import ChevronRight from '@/assets/icons/chevronRight.svg';

function DatePicker() {
  const { today, selectedDate, setSelectedDate } = useDateStore();
  const [currCalendar, setCurrCalendar] = useState<Date>(selectedDate);

  useEffect(() => {
    if (currCalendar.getMonth() !== selectedDate.getMonth()) {
      const newMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1,
      );
      setCurrCalendar(newMonth);
    }
  }, [selectedDate]);

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currCalendar.getFullYear(),
      currCalendar.getMonth() - 1,
      1,
    );
    setCurrCalendar(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currCalendar.getFullYear(),
      currCalendar.getMonth() + 1,
      1,
    );
    setCurrCalendar(nextMonth);
  };

  const goToday = () => {
    setSelectedDate(today);
    setCurrCalendar(today);
  };

  const changeSelectedDate = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const firstDay = new Date(
      currCalendar.getFullYear(),
      currCalendar.getMonth(),
      1,
    );
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());

    const calendar: Array<JSX.Element> = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() + i,
      );
      const dateString = dateToString(date);

      calendar.push(
        <DateWrapper key={dateString} $idx={i}>
          <DateButton
            $isToday={isSameDay(date, today)}
            $isSelected={isSameDay(date, selectedDate)}
            $isCurrentMonth={isCurrentMonth(date, currCalendar.getMonth())}
            onClick={() => {
              changeSelectedDate(date);
            }}
          >
            <time dateTime={dateString}>{date.getDate()}</time>
          </DateButton>
        </DateWrapper>,
      );
    }

    return calendar;
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {currCalendar.getFullYear()}.{padding0(currCalendar.getMonth() + 1)}
      </h2>
      <div className="flex items-center justify-between mt-1">
        <button
          className="text-xs size-6 rounded-md border font-medium border-gray-500"
          onClick={() => {
            goToday();
          }}
        >
          오늘
        </button>
        <div className="flex">
          <button
            type="button"
            className="flex flex-none items-center justify-center p-1"
            onClick={handlePrevMonth}
          >
            <span className="sr-only">Previous month</span>
            <Chevrons
              src={ChevronLeft}
              alt="prev-month"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className=" flex flex-none items-center justify-center p-1"
            onClick={handleNextMonth}
          >
            <span className="sr-only">Next month</span>
            <Chevrons
              src={ChevronRight}
              alt="next-month"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div className="mt-1 grid grid-cols-7 text-sm">{renderCalendar()}</div>
    </div>
  );
}

export default DatePicker;
