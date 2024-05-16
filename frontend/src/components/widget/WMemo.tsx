import { useEffect, useRef, useState } from 'react';

import useMemberStore from '@/stores/MemberStore';
import getUserMemo from '@/services/widget/getUserMemo';
import patchUserMemo from '@/services/widget/patchUserMemo';

import Button from '../common/Button';
import { InputTextArea } from '../common/InputText';

import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/save.svg';

function WMemo() {
  const { memberId } = useMemberStore();

  const [userMemo, setUserMemo] = useState<string>('');
  const [isModifyingMemo, setIsModifyingMemo] = useState<boolean>(false);

  const handleModify = async () => {
    setIsModifyingMemo(!isModifyingMemo);
    if (memberId !== undefined) {
      const memo = await patchUserMemo(memberId, userMemo);
      setUserMemo(memo);
    }
  };

  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setUserMemo(newContent);
    if (textarea.current) {
      textarea.current.style.height = 'auto'; //height 초기화
      let newHeight = textarea.current.scrollHeight;
      if (newHeight > 120) {
        newHeight = 120;
      }
      textarea.current.style.height = newHeight + 'px';
    }
  };

  useEffect(() => {
    const fetchUserMemo = async () => {
      if (memberId) {
        const goal = await getUserMemo(memberId);
        setUserMemo(goal);
      }
    };
    fetchUserMemo();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="font-bold">Memo</div>
        {isModifyingMemo ? (
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
        <InputTextArea
          className="disabled:bg-transparent scrollBar"
          $width="100%"
          $void={true}
          $resize={false}
          ref={textarea}
          rows={5}
          value={userMemo}
          disabled={!isModifyingMemo}
          onChange={handleTextInput}
          maxLength={1000}
          placeholder="메모를 입력해주세요"
        />
      </div>
    </div>
  );
}

export default WMemo;
