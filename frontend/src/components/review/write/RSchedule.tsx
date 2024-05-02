import { useEffect } from 'react';

import { WhiteContainer } from '@/components/common/Container';
import Calendar from '@/assets/icons/calendar.svg';
import Tag from '@/assets/icons/tag.svg';
import Users from '@/assets/icons/users.svg';

type RScheduleProps = {
  $scheduleId: number;
};

function RSchedule({ $scheduleId }: RScheduleProps) {
  useEffect(() => {
    console.log($scheduleId);
  }, []);
  return (
    <WhiteContainer $width="900" className="flex gap-4">
      <div className="flex gap-4 text-sm">
        <img src={Calendar} alt="일정명" className="w-5" />
        <div>
          <div className="font-semibold">코테스터디 3회차</div>
          <div>2024.04.17 16:00 ~ 20214.04.17 17:00</div>
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        <img src={Tag} alt="라벨" className="w-5" />
        <div className="bg-label-red rounded-full w-20"></div>
      </div>
      <div className="flex gap-4 text-sm">
        <img src={Users} alt="참가자" className="w-5" />
        <img
          className="inline-block h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </WhiteContainer>
  );
}

export default RSchedule;
