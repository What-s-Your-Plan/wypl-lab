import { useEffect, useState } from 'react';

import getReviewSchedule from '@/services/review/getReviewSchedule';

import { splitTTime } from '@/utils/DateUtils';

import LabelButton from '@/components/common/LabelButton';
import { WhiteContainer } from '@/components/common/Container';
import Calendar from '@/assets/icons/calendar.svg';
import Tag from '@/assets/icons/tag.svg';
import Users from '@/assets/icons/users.svg';
import Logo from '/logo.png';
import { LabelColorsType } from '@/assets/styles/colorThemes';

type RScheduleProps = {
  scheduleId: number;
};

function RSchedule({ scheduleId }: RScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleSimpleResponse>();

  const renderMemberProfile = () => {
    return schedule?.members.map((member) => {
      return (
        <img
          className="inline-block h-8 w-8 rounded-full"
          key={member.member_id}
          src={member.profile_image ? member.profile_image : Logo}
          alt={member.nickname}
        />
      );
    });
  };

  const fetchSchedule = async () => {
    if (scheduleId != -1) {
      const response = await getReviewSchedule(scheduleId);
      setSchedule(response);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [scheduleId]);

  return (
    <WhiteContainer $width="900" className="flex flex-wrap gap-4">
      <div className="flex gap-4 text-sm">
        <img src={Calendar} alt="일정명" className="w-5" />
        <div>
          <div className="font-semibold">{schedule?.title}</div>
          {schedule && (
            <div>
              {splitTTime(schedule.start_date as string)} ~{' '}
              {splitTTime(schedule.end_date as string)}
            </div>
          )}
        </div>
      </div>
      {schedule?.label && (
        <div className="flex gap-4 items-center text-sm">
          <img src={Tag} alt="라벨" className="w-5" />
          <LabelButton $bgColor={schedule?.label?.color as LabelColorsType}>
            {schedule?.label?.title}
          </LabelButton>
        </div>
      )}
      <div className="flex gap-4 items-center text-sm">
        <img src={Users} alt="참가자" className="w-5" />
        {renderMemberProfile()}
      </div>
    </WhiteContainer>
  );
}

export default RSchedule;
