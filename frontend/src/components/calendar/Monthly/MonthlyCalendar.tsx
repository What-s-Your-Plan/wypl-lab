import { useEffect, useState, useCallback } from 'react';
import MonthlyDay from './MonthlyDay';
import {
  isSameDay,
  isCurrentMonth,
  getDateDiff,
  dateToString,
} from '@/utils/DateUtils';
import useDateStore from '@/stores/DateStore';
import getCalendars from '@/services/calendar/getCalendars';

export type DateSchedule = Array<Array<CalendarSchedule>>;

function MonthlyCalender() {
  const { selectedDate } = useDateStore();
  const [dateInfo, setDateInfo] = useState<Array<DateSchedule>>([]); // 임시
  const [firstDay, setFirstDay] = useState<Date | null>(null);

  const createInit = () => {
    const init = [];

    for (let i = 0; i < 42; i++) {
      init.push([[], [], [], []]);
    }

    return init;
  };

  const updateInfo = useCallback(async (first: Date) => {
    const response = await getCalendars('MONTH', {
      date: dateToString(selectedDate),
    });

    const init: Array<DateSchedule> = createInit();

    if (response) {
      for (const res of response.schedules) {
        const idx = getDateDiff(first, res.start_date);
        const period = getDateDiff(res.start_date, res.end_date);
        let row: number | null = null;
        for (let p = 0; p <= period; p++) {
          if (!row) {
            for (let i = 0; i < 3; i++) {
              if (init[idx + p][i].length === 0 || i === 2) {
                row = i;
                break;
              }
            }
          }
          init[idx + p][row!].push(res);
        }
      }
    }

    setDateInfo(init);
  }, []);

  useEffect(() => {
    const newFirst = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    newFirst.setDate(newFirst.getDate() - newFirst.getDay());
    if (firstDay === null || !isSameDay(firstDay, newFirst)) {
      setFirstDay(newFirst);

      updateInfo(newFirst);
    }
  }, [selectedDate]);

  const renderMonthly = () => {
    const calendar: Array<JSX.Element> = [];

    if (firstDay) {
      for (let i = 0; i < 42; i++) {
        const date = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          firstDay.getDate() + i,
        );

        calendar.push(
          <MonthlyDay
            key={i}
            date={date}
            schedules={dateInfo[i]}
            isCurrentMonth={isCurrentMonth(date, selectedDate.getMonth())}
          />,
        );
      }
    }
    return calendar;
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <h1>
        {selectedDate.getFullYear()}.{selectedDate.getMonth() + 1}
      </h1>
      <div className="lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-transparent text-label-red">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-transparent">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-transparent">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-transparent">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-transparent">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-transparent">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-transparent text-label-blue">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-transparent text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="w-full grid grid-cols-7 grid-rows-6">
            {renderMonthly()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCalender;
