import { useState, useEffect, useCallback } from 'react';
import getCalendars from '@/services/calendar/getCalendars';
import useDateStore from '@/stores/DateStore';
import { dateToString, getTime } from '@/utils/DateUtils';
import * as S from './DailyCalendar.styled';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import useMemberStore from '@/stores/MemberStore';
import { labelFilter } from '@/utils/FilterUtils';

type DailyProps = {
  needUpdate: boolean;
  setUpdateFalse: () => void;
};

function DailyCalendar({ needUpdate, setUpdateFalse }: DailyProps) {
  const { selectedDate, selectedLabels } = useDateStore();
  const [originSked, setOriginSked] = useState<Array<CalendarSchedule>>([]);
  const [schedules, setSchedules] = useState<Array<CalendarSchedule>>([]);
  const { mainColor } = useMemberStore();

  const updateInfo = useCallback(async () => {
    const response = await getCalendars('DAY', dateToString(selectedDate));
    if (response) {
      setOriginSked(response.schedules);
    }
  }, [selectedDate]);

  const filteredSked = useCallback(() => {
    setSchedules(labelFilter(originSked, selectedLabels))
  }, [originSked, selectedLabels])

  useEffect(() => {
    updateInfo();
    setUpdateFalse();
  }, [selectedDate, needUpdate]);

  useEffect(() => {
    filteredSked()
  }, [filteredSked])

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      return (
        <>
          {idx !== 0 && (
            <>
              <div className="w-8 h-10 flex justify-center" key={`line${idx}`}>
                <S.VerticalLine />
              </div>
            </>
          )}
          <S.ScheduleContainer key={schedule.schedule_id}>
            <S.LabelDiv
              $bgColor={
                (schedule.label?.color ||
                  schedule.group?.color ||
                  mainColor) as LabelColorsType
              }
            />
            <S.ScheduleContents>
              <span className="text-sm text-zinc-500">
                {getTime(schedule.start_date)} ~ {getTime(schedule.end_date)}
              </span>
              <span className="text-xl font-bold">{schedule.title}</span>
              <p className="flex">{schedule.description}</p>
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
        <div className="overflow-y-auto h-full scrollBar flex">
          <div className="w-full h-fit p-4 m-auto">{renderSchedule()}</div>
        </div>
      )}
    </>
  );
}

export default DailyCalendar;
