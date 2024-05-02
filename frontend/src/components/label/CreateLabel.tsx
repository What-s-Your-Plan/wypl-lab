import { Dispatch, SetStateAction, useRef } from 'react';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import ColorSelectButton from '@/components/color/ColorSelectButton';
import { CreateDiv } from '@/components/label/Styled';
import { InputDefault } from '@/components/common/InputText';

type Props = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
  handleKeyDown?: (() => void) | (() => Promise<void>);
};

function CreateLabel({ color, setColor, handleKeyDown }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCreate = async () => {
    console.log(inputRef.current?.value, color);
    handleKeyDown ? await handleKeyDown() : null;
  };
  return (
    <CreateDiv>
      <ColorSelectButton color={color} setColor={setColor} />
      <InputDefault
        maxLength={15}
        placeholder="라벨명을 입력하세요"
        onKeyDown={(e) => {
          e.key === 'Enter' ? handleCreate() : null;
        }}
        ref={inputRef}
      />
    </CreateDiv>
  );
}

export default CreateLabel;
