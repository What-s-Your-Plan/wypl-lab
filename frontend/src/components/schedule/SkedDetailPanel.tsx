import { useEffect, useState } from 'react';
import getScheduleDetail from '@/services/schedule/getScheduleDetail';
import * as Items from './SkedDetailItems';
import TrashIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/editPaper.svg';

type DetailProps = {
  scheduleId: number;
};

function SkedDetailPanel({ scheduleId }: DetailProps) {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const getSchedule = async () => {
    const response = await getScheduleDetail(scheduleId);
    if (response) {
      setSchedule(response);
    }
  };
  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className="w-[580px] flex flex-col justify-center">
      {schedule && (
        <>
          <div className="flex flex-row-reverse gap-2">
            <button>
              <img src={TrashIcon} alt="trash" />
            </button>
            <button>
              <img src={EditIcon} alt="edit" />
            </button>
          </div>
          <Items.Title title={schedule.title} />
          <Items.Time
            startDate={schedule.start_date}
            endDate={schedule.end_date}
          />
          {schedule.description && (
            <Items.Description content={schedule.description} />
          )}
          {schedule.category === 'MEMBER' ? (
            <Items.Label label={schedule.label} />
          ) : (
            <Items.Member member={schedule.members} />
          )}
          {schedule.repetition && (
            <Items.Repeat repeat={schedule.repetition}/>
          )}
        </>
      )}
    </div>
  );
}

export default SkedDetailPanel;
