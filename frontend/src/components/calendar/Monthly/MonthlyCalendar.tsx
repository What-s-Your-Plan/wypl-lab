import { useEffect, useState, useCallback } from 'react';
import MonthlyDay from './MonthlyDay';
import {
  isSameDay,
  isCurrentMonth,
  getDateDiff,
  dateToString,
} from '@/utils/DateUtils';
import { labelFilter } from '@/utils/FilterUtils';
import useDateStore from '@/stores/DateStore';
import getCalendars from '@/services/calendar/getCalendars';
import getGroupCalendars from '@/services/calendar/getGroupCalendars';
import { Chevrons } from '../DatePicker.styled';

import ChevronRight from '@/assets/icons/chevronRight.svg';
import ChevronLeft from '@/assets/icons/chevronLeft.svg';

export type DateSchedule = Array<Array<CalendarSchedule>>;

type MonthlyProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
  needUpdate: boolean;
  setUpdateFalse: () => void;
  handleSkedClick: (id: number) => void;
  goDay: () => void;
};

function MonthlyCalender({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleSkedClick,
  goDay
}: MonthlyProps) {
  const createInit = (): Array<DateSchedule> => {
    const init = [];

    for (let i = 0; i < 42; i++) {
      init.push([[], [], []]);
    }

    return init;
  };

  const { selectedDate, setSelectedDate, selectedLabels } = useDateStore();
  const [originSked, setOriginSked] = useState<Array<CalendarSchedule>>([]);
  const [monthSchedules, setMonthSchedules] =
    useState<Array<DateSchedule>>(createInit());
  const [firstDay, setFirstDay] = useState<Date | null>(null);

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 2,
      0,
    );
    if (nextMonth.getDate() >= selectedDate.getDate()) {
      nextMonth.setDate(selectedDate.getDate());
    }

    setSelectedDate(nextMonth);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      0,
    );
    if (prevMonth.getDate() >= selectedDate.getDate()) {
      prevMonth.setDate(selectedDate.getDate());
    }

    setSelectedDate(prevMonth);
  };

  const updateInfo = useCallback(async () => {
    if (category === 'MEMBER') {
      const response = await getCalendars('MONTH', dateToString(selectedDate));

      if (response) {
        setOriginSked(response.schedules);
      }
    } else if (category === 'GROUP' && groupId) {
      const response = await getGroupCalendars(
        'MONTH',
        groupId,
        dateToString(selectedDate),
      );

      if (response) {
        setOriginSked(response.schedules);
      }
    }
  }, [selectedDate, groupId]);

  const filteredSked = useCallback(() => {
    if (firstDay) {
      const init: Array<DateSchedule> = createInit();

      for (const sked of labelFilter(originSked, selectedLabels)) {
        let idx = getDateDiff(firstDay, sked.start_date);
        let period = getDateDiff(sked.start_date, sked.end_date);
        console.log(idx);
        if (idx < 0) {
          period += idx;
          idx = 0;
        }

        let row: number | null = null;
        for (let p = 0; p <= period; p++) {
          if (idx + p >= 42) {
            break;
          }
          if (row === null) {
            for (let i = 0; i < 3; i++) {
              if (init[idx + p][i].length === 0 || i === 2) {
                row = i;
                break;
              }
            }
          }
          init[idx + p][row!].push(sked);
        }
      }

      setMonthSchedules(init);
    }
  }, [originSked, selectedLabels]);

  useEffect(() => {
    const newFirst = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    newFirst.setDate(newFirst.getDate() - newFirst.getDay());
    if (firstDay === null || !isSameDay(firstDay, newFirst)) {
      setFirstDay(newFirst);

      updateInfo();
      setUpdateFalse();
    }
  }, [updateInfo]);

  useEffect(() => {
    if (needUpdate && firstDay) {
      updateInfo();
    }
  }, [needUpdate]);

  useEffect(() => {
    filteredSked();
  }, [filteredSked]);

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
            handleSkedClick={handleSkedClick}
            date={date}
            firstDay={firstDay}
            schedules={monthSchedules[i]}
            isCurrentMonth={isCurrentMonth(date, selectedDate.getMonth())}
            goDay={goDay}
          />,
        );
      }
    }
    return calendar;
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between px-6 py-2">
        <h1 className="text-lg font-bold leading-6 text-default-black">
          {selectedDate.getFullYear()}.{selectedDate.getMonth() + 1}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handlePrevMonth();
            }}
          >
            <span className="sr-only">Prev month</span>
            <Chevrons src={ChevronLeft} alt="prev-month" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              handleNextMonth();
            }}
          >
            <span className="sr-only">Next month</span>
            <Chevrons src={ChevronRight} alt="next-month" aria-hidden="true" />
          </button>
        </div>
      </header>
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
