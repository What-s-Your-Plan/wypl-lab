import { useState } from 'react';
import * as Containers from '@/components/common/Container';
import DatePicker from '@/components/calendar/DatePicker';
import MonthlyCalender from '@/components/calendar/Monthly/MonthlyCalendar';
import WeeklyCalendar from '@/components/calendar/Weekly/WeeklyCalendar';
import IndexGroup from '@/components/calendar/IndexGroup';
import Button from '@/components/common/Button';
import ScheduleModal from '@/components/schedule/ScheduleModal';
import SkedDetailModal from '@/components/schedule/SkedDetailModal';

import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import initialSchedule from '@/constants/ScheduleFormInit';
import { dateToString } from '@/utils/DateUtils';
import useDateStore from '@/stores/DateStore';
import useMemberStore from '@/stores/MemberStore';
import Todo from './Todo';
import DailyCalendar from './Daily/DailyCalendar';

type CalendarProps = {
  category: 'MEMBER' | 'GROUP';
  groupId?: number;
};

function CalendarContent({ category, groupId }: CalendarProps) {
  const { selectedDate } = useDateStore();
  const { memberId } = useMemberStore();
  const [calendarType, setCalendarType] = useState<CalenderType>('MONTH');
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDetailOpen, setDetailOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  const [skedInit, setSkedInit] = useState<Schedule & Repeat>({
    ...initialSchedule,
    category,
    members: [{ member_id: memberId as number }],
    groupId: groupId ?? null,
  });

  const closeCreate = () => {
    setIsCreateOpen(false);
  };

  const openCreate = () => {
    setIsCreateOpen(true);
  };

  const setUpdateTrue = () => {
    setNeedUpdate(true);
  };

  const setUpdateFalse = () => {
    setNeedUpdate(false);
  };

  const openDetail = (id: number) => {
    setDetailId(id);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setNeedUpdate(true);
    renderCalender();
  };

  const renderCalender = () => {
    switch (calendarType) {
      case 'MONTH':
        return (
          <MonthlyCalender
            category={category}
            groupId={groupId}
            handleSkedClick={openDetail}
            needUpdate={needUpdate}
            setUpdateFalse={setUpdateFalse}
            goDay={() => {
              setCalendarType('DAY');
            }}
          />
        );
      case 'WEEK':
        return (
          <WeeklyCalendar
            category={category}
            groupId={groupId}
            needUpdate={needUpdate}
            setUpdateFalse={setUpdateFalse}
            handleSkedClick={openDetail}
          />
        );
      case 'DAY':
        return (
          <DailyCalendar
            category={category}
            groupId={groupId}
            needUpdate={needUpdate}
            setUpdateFalse={setUpdateFalse}
            handleSkedClick={openDetail}
          />
        );
      default:
        null;
    }
  };

  return (
    <>
      <Containers.Container className="flex" $width="right">
        <Containers.WhiteContainer $width="1300" $height="max">
          <div className="flex p-3 h-full gap-4">
            <div className="grow">{renderCalender()}</div>
            <div className="flex flex-col w-300">
              <Containers.WhiteContainer $width="1300" $height="one">
                <DatePicker />
              </Containers.WhiteContainer>
              <Todo />
              <Button
                className="py-2"
                $size="lg"
                onClick={() => {
                  setSkedInit({
                    ...skedInit,
                    startDate: dateToString(selectedDate),
                    endDate: dateToString(selectedDate),
                  });
                  openCreate();
                }}
              >
                <img src={CalendarAddIcon} alt="calendar-add" />
                <span>일정 등록</span>
              </Button>
            </div>
          </div>
        </Containers.WhiteContainer>
        <IndexGroup calendarType={calendarType} setCType={setCalendarType} />
      </Containers.Container>
      <ScheduleModal
        isOpen={isCreateOpen}
        init={skedInit}
        handleClose={closeCreate}
        handleConfirm={setUpdateTrue}
      />
      <SkedDetailModal
        isOpen={isDetailOpen}
        scheduleId={detailId as number}
        handleClose={closeDetail}
        setUpdateTrue={setUpdateTrue}
      />
    </>
  );
}

export default CalendarContent;
