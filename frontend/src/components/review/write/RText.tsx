import { useRef } from 'react';

import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';

function RText() {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  return (
    <WhiteContainer $width="900">
      <InputTextArea
        className="scrollBar"
        $width="100%"
        rows={5}
        ref={textarea}
        placeholder="내용을 입력해주세요"
        onChange={handleResizeHeight}
      />
    </WhiteContainer>
  );
}

export default RText;
