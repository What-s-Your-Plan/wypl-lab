import * as S from '@/components/common/Container';
import WidgetList from '@/components/widget/WidgetList';
import DatePicker from '@/components/calendar/DatePicker';
import MonthlyCalender from '@/components/calendar/Monthly/MonthlyCalendar';

function CalendarPage() {
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <WidgetList />
        <S.Container $width="800">
          <S.WhiteContainer $width="1300" $height='max'>
            <div className="flex gap-4 h-full">
              <div className='w-900'>
                <MonthlyCalender />
              </div>
              <S.WhiteContainer $width="300" $height="one">
                <DatePicker />
              </S.WhiteContainer>
            </div>
          </S.WhiteContainer>
        </S.Container>
      </div>
    </>
  );
}

export default CalendarPage;
