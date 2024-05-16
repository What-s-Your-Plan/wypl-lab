import { useState, useEffect, useCallback, Fragment } from 'react';
import getGroupCalendars from '@/services/calendar/getGroupCalendars';
import getCalendars from '@/services/calendar/getCalendars';
import useDateStore from '@/stores/DateStore';
import { dateToString, getTime } from '@/utils/DateUtils';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import useMemberStore from '@/stores/MemberStore';
import { labelFilter } from '@/utils/FilterUtils';

import * as S from './DailyCalendar.styled';
import useLoading from '@/hooks/useLoading';
import NoContentAnimation from '@/components/animation/NoContent';

type DailyProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
  needUpdate: boolean;
  setUpdateFalse: () => void;
  handleSkedClick: (id: number) => void;
};

function DailyCalendar({
  category,
  groupId,
  needUpdate,
  setUpdateFalse,
  handleSkedClick,
}: DailyProps) {
  const { canStartLoading, endLoading } = useLoading();
  const { selectedDate, selectedLabels } = useDateStore();
  const [originSked, setOriginSked] = useState<Array<CalendarSchedule>>([]);
  const [schedules, setSchedules] = useState<Array<CalendarSchedule>>([]);
  const { mainColor } = useMemberStore();

  const updateInfo = useCallback(async () => {
    if (canStartLoading()) {
      return;
    }
    if (category === 'MEMBER') {
      const response = await getCalendars(
        'DAY',
        dateToString(selectedDate),
      ).finally(() => {
        endLoading();
      });
      if (response) {
        setOriginSked(response.schedules);
      }
    } else if (category === 'GROUP' && groupId) {
      const response = await getGroupCalendars(
        'DAY',
        groupId,
        dateToString(selectedDate),
      ).finally(() => {
        endLoading();
      });
      if (response) {
        setOriginSked(response.schedules);
      }
    }
  }, [selectedDate, groupId]);

  useEffect(() => {
    updateInfo();
  }, [groupId]);

  const filteredSked = useCallback(() => {
    setSchedules(labelFilter(originSked, selectedLabels));
  }, [originSked, selectedLabels]);

  useEffect(() => {
    updateInfo();
    setUpdateFalse();
  }, [selectedDate, needUpdate]);

  useEffect(() => {
    filteredSked();
  }, [filteredSked]);

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      return (
        <Fragment key={idx}>
          {idx !== 0 && (
            <>
              <div className="w-8 h-10 flex justify-center" key={`line${idx}`}>
                <S.VerticalLine />
              </div>
            </>
          )}
          <S.ScheduleContainer
            key={schedule.schedule_id}
            onClick={() => {
              handleSkedClick(schedule.schedule_id);
            }}
          >
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
        </Fragment>
      );
    });
  };

  return (
    <>
      {schedules.length === 0 ? (
        <NoContentAnimation />
      ) : (
        <div className="overflow-y-auto h-full scrollBar flex">
          <div className="w-full h-fit p-4 m-auto">{renderSchedule()}</div>
        </div>
      )}
    </>
  );
}

export default DailyCalendar;
