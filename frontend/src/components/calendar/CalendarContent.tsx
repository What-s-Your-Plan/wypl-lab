import { useState } from 'react';
import * as Containers from '@/components/common/Container';
import DatePicker from '@/components/calendar/DatePicker';
import MonthlyCalender from '@/components/calendar/Monthly/MonthlyCalendar';
import WeeklyCalendar from '@/components/calendar/Weekly/WeeklyCalendar';
import IndexGroup from '@/components/calendar/IndexGroup';
import Button from '@/components/common/Button';
import ScheduleModal from '@/components/schedule/ScheduleModal';
import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import initialSchedule from '@/constants/ScheduleFormInit';
import { dateToString } from '@/utils/DateUtils';
import useDateStore from '@/stores/DateStore';

function CalendarContent() {
  const { selectedDate } = useDateStore();
  const [calendarType, setCalendarType] = useState<CalenderType>('MONTH');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [skedInit, setSkedInit] = useState<Schedule & Repeat>({
    ...initialSchedule,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const renderCalender = () => {
    switch (calendarType) {
      case 'MONTH':
        return <MonthlyCalender />;
      case 'WEEK':
        return <WeeklyCalendar />;
      default:
        null;
    }
  };

  return (
    <>
      <Containers.Container className="flex" $width="800">
        <Containers.WhiteContainer $width="1300" $height="max">
          <div className="flex p-3 h-full gap-4">
            <div className="grow">{renderCalender()}</div>
            <div className="flex flex-col w-300">
              <Containers.WhiteContainer $width="1300" $height="one">
                <DatePicker />
              </Containers.WhiteContainer>
              <Containers.WhiteContainer $width="1300" $height="one">
                todo
              </Containers.WhiteContainer>
              <Button
                className="py-2"
                $size="lg"
                onClick={() => {
                  setSkedInit({
                    ...initialSchedule,
                    startDate: dateToString(selectedDate),
                    endDate: dateToString(selectedDate),
                  });
                  openModal();
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
      <ScheduleModal isOpen={isModalOpen} init={skedInit} handleClose={closeModal} handleConfirm={() => {}}/>
    </>
  );
}

export default CalendarContent;
