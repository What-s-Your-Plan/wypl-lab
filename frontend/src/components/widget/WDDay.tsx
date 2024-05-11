import { useEffect, useState } from 'react';

import useMemberStore from '@/stores/MemberStore';

import Button from '../common/Button';

import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import { InputDefault } from '../common/InputText';
import getUserDDay from '@/services/widget/getUserDDay';
import patchUserDDay from '@/services/widget/patchUserDDay';

function WDDay() {
  const { memberId } = useMemberStore();

  const [userTitle, setUserTitle] = useState<string>('');
  const [userDDay, setUserDDay] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [isModifyingDDay, setIsModifyingDDay] = useState<boolean>(false);

  const handleModify = async () => {
    setIsModifyingDDay(!isModifyingDDay);
    if (memberId) {
      const dday = await patchUserDDay(memberId, userTitle, targetDate);
      setUserTitle(dday.title);
      setUserDDay(dday.d_day);
      setTargetDate(dday.local_date);
    }
  };

  useEffect(() => {
    const fetchUserDDay = async () => {
      if (memberId) {
        const dday = await getUserDDay(memberId);
        setUserDDay(dday.d_day);
        setUserTitle(dday.title);
        setTargetDate(dday.local_date);
      }
    };
    fetchUserDDay();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-between content-center w-full mb-2">
          {isModifyingDDay ? (
            <InputDefault
              className="disabled:bg-transparent"
              $width="60%"
              $void={true}
              id="ddayTitle"
              type="string"
              value={userTitle}
              disabled={!isModifyingDDay}
              onChange={(e) => setUserTitle(e.target.value)}
              maxLength={10}
              placeholder="디데이 제목(10자 이내)"
            />
          ) : (
            <span className="w-[60%] break-keep font-semibold">
              {userTitle}
            </span>
          )}

          {isModifyingDDay ? (
            <Button $size="none" onClick={handleModify}>
              <img src={Save} alt="저장" className="w-5" />
            </Button>
          ) : (
            <Button $size="none" onClick={handleModify}>
              <img src={Edit} alt="수정" className="w-5" />
            </Button>
          )}
        </div>
      </div>
      <div>
        {isModifyingDDay ? (
          <InputDefault
            className="disabled:bg-transparent text-sm"
            $width="100%"
            $void={true}
            id="targetDate"
            type="date"
            value={targetDate}
            disabled={!isModifyingDDay}
            onChange={(e) => setTargetDate(e.target.value)}
            min={'1970-01-01'}
            placeholder="디데이 날짜 선택"
          />
        ) : (
          <div className="text-3xl text-center mt-1 font-semibold">
            {userDDay}
          </div>
        )}
      </div>
    </div>
  );
}

export default WDDay;
