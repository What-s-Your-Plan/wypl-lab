import { useState } from 'react';

import Button from '../common/Button';

import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';
import { InputDefault } from '../common/InputText';

function WDDay() {
  const [title, setTitle] = useState<string>('자율 발표');
  const userDDay = 'D-13';
  const [targetDate, setTargetDate] = useState<string>('2024-05-20');
  const [isModifyingDDay, setIsModifyingDDay] = useState<boolean>(false);

  const handleModify = () => {
    setIsModifyingDDay(!isModifyingDDay);
  };

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
              value={title}
              disabled={!isModifyingDDay}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="디데이 제목 입력"
            />
          ) : (
            <span className="w-[60%] break-keep">{title}</span>
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
            placeholder="디데이 날짜 선택"
          />
        ) : (
          <div className="text-4xl text-center mt-1 font-semibold">
            {userDDay}
          </div>
        )}
      </div>
    </div>
  );
}

export default WDDay;
