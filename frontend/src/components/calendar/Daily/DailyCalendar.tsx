import { useState, useEffect, useCallback } from 'react';
import getCalendars from '@/services/calendar/getCalendars';
import useDateStore from '@/stores/DateStore';
import { dateToString } from '@/utils/DateUtils';
import * as S from './DailyCalendar.styled';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import { getTime } from '@/utils/DateUtils';

type DailyProps = {
  needUpdate: boolean;
  setUpdateFalse: () => void;
};

function DailyCalendar({ needUpdate, setUpdateFalse }: DailyProps) {
  const { selectedDate } = useDateStore();
  const [schedules, setSchedules] =
    useState<Array<CalendarSchedule>>([]);

  const updateInfo = useCallback(async () => {
    const response = await getCalendars('DAY', dateToString(selectedDate));
    if (response) {
      setSchedules(response.schedules);
    }
  }, [selectedDate]);

  useEffect(() => {
    updateInfo();
    setUpdateFalse();
  }, [selectedDate, needUpdate]);

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      return (
        <>
          {idx !== 0 && (
            <>
              <div className="w-8 h-10 flex justify-center">
                <S.VerticalLine />
              </div>
            </>
          )}
          <S.ScheduleContainer key={schedule.schedule_id}>
            <S.LabelDiv
              $bgColor={
                schedule.label
                  ? (schedule.label.color as LabelColorsType)
                  : 'labelBrown'
              }
            />
            <S.ScheduleContents>
              <span className="text-sm text-zinc-500">
                {getTime(schedule.start_date)} ~ {getTime(schedule.end_date)}
              </span>
              <span className="text-lg font-bold">제목 : {schedule.title}</span>
              <p className="flex">설명 : {schedule.description}</p>
            </S.ScheduleContents>
          </S.ScheduleContainer>
        </>
      );
    });
  };

  return (
    <>
      {schedules.length === 0 ? (
        <div>일정을 추가해 주세요</div>
      ) : (
        <div className='overflow-y-auto h-full scrollBar flex'>

          <div className="w-full h-fit p-4 m-auto">
            {renderSchedule()}
          </div>
        </div>
      )}
    </>
  );
}

export default DailyCalendar;
