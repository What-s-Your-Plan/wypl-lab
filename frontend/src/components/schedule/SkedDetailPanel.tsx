import { useEffect, useState } from "react";
import getScheduleDetail from "@/services/schedule/getScheduleDetail";

type DetailProps = {
  scheduleId: number;
};

function SkedDetailPanel({ scheduleId }: DetailProps) {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null)
  const getSchedule = async () => {
    const response = await getScheduleDetail(scheduleId);
    if (response) {
      setSchedule(response);
    }
  }
  useEffect(() => {
    getSchedule();
  }, [])

  return (
    <div className="w-[580px] flex flex-col justify-center">
      {schedule && (<>
        패널
      </>)}
    </div>
  );
}

export default SkedDetailPanel;
