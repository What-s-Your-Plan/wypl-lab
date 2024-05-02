import { useRef } from 'react';
import useReviewStore from '@/stores/ReviewStore';
import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';
import { TextContent } from '@/objects/Content';

type RTextProps = {
  index: number;
  content: TextContent;
};

function RText({ index, content }: RTextProps) {
  const { setContent } = useReviewStore();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = content;
    newContent.text = event.target.value;
    setContent(index, newContent);
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
        value={content.text}
        rows={5}
        ref={textarea}
        placeholder="내용을 입력해주세요"
        onChange={(e) => handleTextInput(e)}
      />
    </WhiteContainer>
  );
}

export default RText;
