import { LabelColorsType } from '@/assets/styles/colorThemes';
import { LongSchedule } from './WeeklyCalendar';
import * as S from './WeeklyCalendar.styled';
import useMemberStore from '@/stores/MemberStore';

type LSchedulesProps = {
  lSchedules: Array<LongSchedule>;
  row: number;
};

function WeeklyLSchedules({ lSchedules, row }: LSchedulesProps) {
  const gridRow = Math.max(2, row);
  const { mainColor } = useMemberStore();

  const renderSchedules = () => {
    return lSchedules.map((schedule, index) => {
      const bgColor =
        schedule.schedule.label?.color ||
        schedule.schedule.group?.color ||
        mainColor;

      return (
        <S.LScheduleSpan
          key={index}
          $bgColor={bgColor as LabelColorsType}
          $startDay={schedule.startDay}
          $row={schedule.row}
          $period={schedule.period}
        >
          {schedule.schedule.title}
        </S.LScheduleSpan>
      );
    });
  };

  return <S.LScheduleGrid $row={gridRow}>{renderSchedules()}</S.LScheduleGrid>;
}

export default WeeklyLSchedules;
