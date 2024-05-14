import { Dispatch, SetStateAction, useRef } from 'react';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import ColorSelectButton from '@/components/color/ColorSelectButton';
import { CreateDiv } from '@/components/label/Styled';
import { InputDefault } from '@/components/common/InputText';
import postCreateLabel from '@/services/label/postCreateLabel';

type CreateLabelProps = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
  handleKeyDown?: (() => void) | (() => Promise<void>);
};

function CreateLabel({ color, setColor, handleKeyDown }: CreateLabelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCreate = async () => {
    handleKeyDown ? await handleKeyDown() : null;
  };
  return (
    <CreateDiv>
      <ColorSelectButton color={color} setColor={setColor} />
      <InputDefault
        maxLength={15}
        placeholder="라벨명을 입력하세요"
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') {
            if (inputRef.current){
              postCreateLabel(color, inputRef.current.value);
              handleCreate()
            } else {
              window.alert('라벨을 입력해 주세요')
            }
          }
        }}
        ref={inputRef}
      />
    </CreateDiv>
  );
}

export default CreateLabel;
