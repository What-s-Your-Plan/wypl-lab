import { stringToDate } from '@/utils/DateUtils';
import * as S from './WeeklyCalendar.styled';
import { LabelColorsType } from '@/assets/styles/colorThemes';

type WSchedulesProps = {
  schedules: Array<CalendarSchedule>;
};

function WeeklySchedules({ schedules }: WSchedulesProps) {
  const renderSchedules = () => {
    return schedules.map((schedule, index) => {
      const startDate = stringToDate(schedule.start_date);
      const endDate = stringToDate(schedule.end_date);
      const startGrid =
        startDate.getHours() * 12 + Math.floor(startDate.getMinutes() / 5) + 1;
      const endGrid =
        endDate.getHours() * 12 + Math.ceil(endDate.getMinutes() / 5) + 1;

      const hour12 = (date: Date) => {
        let hour = date.getHours();
        if (hour > 12) {
          hour -= 12;
        }
        return hour ? hour : 12;
      };

      const startAmPm = startDate.getHours() / 12 < 1 ? 'AM' : 'PM';
      const endAmPm = endDate.getHours() / 12 < 1 ? 'AM' : 'PM';

      return (
        <S.ScheduleList
          key={index}
          $day={startDate.getDay()}
          $start={startGrid}
          $length={endGrid - startGrid}
        >
          <S.ScheduleButton
            $bgColor={
              schedule.label
                ? (schedule.label.color as LabelColorsType)
                : 'labelBrown'
            }
          >
            <p className="order-1 font-semibold text-default-white">
              {schedule.title}
            </p>
            <p className="text-default-coolgray text-left">
              <time dateTime={schedule.start_date}>
                {hour12(startDate)}:{startDate.getMinutes()} {startAmPm} ~{' '}
              </time>
              <time dateTime={schedule.end_date}>
                {hour12(endDate)}:{endDate.getMinutes()} {endAmPm}
              </time>
            </p>
          </S.ScheduleButton>
        </S.ScheduleList>
      );
    });
  };

  return (
    <ol
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-7"
      style={{
        gridTemplateRows: 'repeat(288, minmax(0, 1fr)) auto',
      }}
    >
      {renderSchedules()}
    </ol>
  );
}

export default WeeklySchedules;
