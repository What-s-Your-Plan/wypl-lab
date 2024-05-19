import { LabelColorsType } from '@/assets/styles/colorThemes';
import { LongSchedule } from './WeeklyCalendar';
import * as S from './WeeklyCalendar.styled';
import useMemberStore from '@/stores/MemberStore';

type LSchedulesProps = {
  lSchedules: Array<LongSchedule>;
  row: number;
  gColor: string | null;
  handleSkedClick: (id: number) => void;
};

function WeeklyLSchedules({
  lSchedules,
  row,
  gColor,
  handleSkedClick,
}: LSchedulesProps) {
  const gridRow = Math.max(2, row);
  const { mainColor } = useMemberStore();

  const renderSchedules = () => {
    return lSchedules.map((schedule, index) => {
      const bgColor =
        gColor ||
        schedule.schedule.label?.color ||
        schedule.schedule.group?.color ||
        mainColor;

      return (
        <S.LScheduleButton
          key={index}
          $bgColor={bgColor as LabelColorsType}
          $startDay={schedule.startDay}
          $row={schedule.row}
          $period={schedule.period}
          onClick={() => {
            handleSkedClick(schedule.schedule.schedule_id);
          }}
        >
          {schedule.schedule.title}
        </S.LScheduleButton>
      );
    });
  };

  return <S.LScheduleGrid $row={gridRow}>{renderSchedules()}</S.LScheduleGrid>;
}

export default WeeklyLSchedules;
