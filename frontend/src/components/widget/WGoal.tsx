import { useState } from 'react';

import Button from '../common/Button';

import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import { InputDefault } from '../common/InputText';

function WGoal() {
  const [userGoal, setUserGoal] = useState<string>('');
  const [isModifyingGoal, setIsModifyingGoal] = useState<boolean>(false);

  const handleModify = () => {
    setIsModifyingGoal(!isModifyingGoal);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>Goal</div>
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
          className="disabled:bg-transparent"
          $width="100%"
          $void={true}
          value={userGoal}
          disabled={!isModifyingGoal}
          onChange={(e) => setUserGoal(e.target.value)}
          placeholder="목표를 입력해주세요"
        />
      </div>
    </div>
  );
}

export default WGoal;
