import { useState } from 'react';
import * as Containers from '@/components/common/Container';
import DatePicker from '@/components/calendar/DatePicker';
import MonthlyCalender from '@/components/calendar/Monthly/MonthlyCalendar';
import WeeklyCalendar from '@/components/calendar/Weekly/WeeklyCalendar';
import IndexGroup from '@/components/calendar/IndexGroup';

function CalendarContent() {
  const [calendarType, setCalendarType] = useState<CalenderType>('MONTH');

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
    <Containers.Container className="flex" $width="800">
      <Containers.WhiteContainer $width="1300" $height="max">
        <div className="flex p-3 h-full gap-4">
          <div className="grow">{renderCalender()}</div>
          <Containers.WhiteContainer $width="300" $height="one">
            <DatePicker />
          </Containers.WhiteContainer>
        </div>
      </Containers.WhiteContainer>
      <IndexGroup calendarType={calendarType} setCType={setCalendarType} />
    </Containers.Container>
  );
}

export default CalendarContent;
