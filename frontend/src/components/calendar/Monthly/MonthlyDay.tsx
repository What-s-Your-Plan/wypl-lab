import * as S from './MonthlyCalendar.styled';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import { DateSchedule } from './MonthlyCalendar';
import { isSameDay, stringToDate, getDateDiff } from '@/utils/DateUtils';
import useDateStore from '@/stores/DateStore';

type MDayProps = {
  date: Date;
  schedules: DateSchedule;
  isCurrentMonth: boolean;
};

function MonthlyDay({ date, schedules, isCurrentMonth }: MDayProps) {
  const { selectedDate } = useDateStore();

  const renderSchedule = () => {
    return schedules.map((schedule, idx) => {
      if (idx < 3) {
        if (schedule.length > 0) {
          const start = stringToDate(schedule[0].start_date);
          const end = stringToDate(schedule[0].end_date);

          if (isSameDay(start, date) || date.getDay() === 0) {
            const width = Math.min(
              7 - date.getDay(),
              getDateDiff(date, end) + 1,
            );
            const color = schedule[0].label
              ? (schedule[0].label!.color as LabelColorsType)
              : 'labelBrown';

            return (
              <S.ScheduleSpan $color={color} $top={idx} $width={width}>
                <span className="w-full truncate">{schedule[0].title}</span>
              </S.ScheduleSpan>
            );
          }
        } else {
          return (
            <S.NoSchedule $top={idx} aria-hidden="true">
              no schedule
            </S.NoSchedule>
          );
        }
      } else if (idx === 2) {
        if (schedule.length === 0) {
          return (
            <S.NoSchedule $top={idx} aria-hidden="true">
              no schedule
            </S.NoSchedule>
          );
        } else if (schedule.length > 0) {
          return (
            <span className="truncate h-4 absolute top-12">
              + {schedule.length}
            </span>
          );
        }
      }
    });
  };

  return (
    <S.DateContainer>
      <S.DateSpan
        $isCurrentMonth={isCurrentMonth}
        $day={date.getDay()}
        $isSelected={isSameDay(date, selectedDate)}
      >
        {date.getDate()}
      </S.DateSpan>
      <div className="relative">{renderSchedule()}</div>
    </S.DateContainer>
  );
}

export default MonthlyDay;
