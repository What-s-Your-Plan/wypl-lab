import * as S from './WeeklyCalendar.styled';
import useDateStore from '@/stores/DateStore';
import { dateToString, isSameDay } from '@/utils/DateUtils';

type WDaysProps = {
  firstDay: Date | null;
};

function WeeklyDays({ firstDay }: WDaysProps) {
  const { selectedDate } = useDateStore();

  const numToDay = (day: number) => {
    switch (day) {
      case 0:
        return 'S';
      case 1:
        return 'M';
      case 2:
        return 'T';
      case 3:
        return 'W';
      case 4:
        return 'T';
      case 5:
        return 'F';
      case 6:
        return 'S';
      default:
        return '';
    }
  };

  const renderDays = () => {
    const days: Array<JSX.Element> = [];
    if (firstDay) {
      for (let i = 0; i < 7; i++) {
        const date = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          firstDay.getDate() + i,
        );
        days.push(
          <S.DayWrapper key={dateToString(date)}>
            {numToDay(i)}{' '}
            <S.DateSpan
              $isSelected={isSameDay(selectedDate, date)}
              $isHoliday={i === 0}
              $isSat={i === 6}
            >
              <span>{date.getDate()}</span>
            </S.DateSpan>
          </S.DayWrapper>,
        );
      }
      return days;
    }
    return <></>;
  };
  return (
    <S.DaySticky>
      <S.DayContainer>
        <div className="col-end-1 w-14"></div>
        {renderDays()}
      </S.DayContainer>
    </S.DaySticky>
  );
}

export default WeeklyDays;
