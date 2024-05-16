import { useEffect, useState } from 'react';

import useMemberStore from '@/stores/MemberStore';
import getUserGoal from '@/services/widget/getUserGoal';
import patchUserGoal from '@/services/widget/patchUserGoal';

import Button from '../common/Button';

import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import { InputDefault } from '../common/InputText';

function WGoal() {
  const { memberId } = useMemberStore();
  const [userGoal, setUserGoal] = useState<string>('');
  const [isModifyingGoal, setIsModifyingGoal] = useState<boolean>(false);

  const handleModify = async () => {
    setIsModifyingGoal(!isModifyingGoal);
    if (memberId !== undefined) {
      const goal = await patchUserGoal(memberId, userGoal);
      setUserGoal(goal);
    }
  };

  useEffect(() => {
    const fetchUserGoal = async () => {
      if (memberId) {
        const goal = await getUserGoal(memberId);
        setUserGoal(goal);
      }
    };
    fetchUserGoal();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="font-bold">Goal</div>
        {isModifyingGoal ? (
          <Button $size="none" onClick={handleModify}>
            <img src={Save} alt="저장" className="w-5" />
          </Button>
        ) : (
          <Button $size="none" onClick={handleModify}>
            <img src={Edit} alt="수정" className="w-5" />
          </Button>
        )}
      </div>
      <div>
        <InputDefault
          className="disabled:bg-transparent mt-3"
          $width="100%"
          $void={true}
          value={userGoal}
          disabled={!isModifyingGoal}
          onChange={(e) => setUserGoal(e.target.value)}
          maxLength={60}
          placeholder="목표를 입력해주세요(60자 이내)"
        />
      </div>
    </div>
  );
}

export default WGoal;
