import { Dispatch, SetStateAction, useRef } from 'react';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import ColorSelectButton from '@/components/color/ColorSelectButton';
import { CreateDiv } from '@/components/label/Styled';
import { InputDefault } from '@/components/common/InputText';
import postCreateLabel from '@/services/label/postCreateLabel';
import useToastStore from '@/stores/ToastStore';

import useLoading from '@/hooks/useLoading';

type CreateLabelProps = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
  handleKeyDown?: (() => void) | (() => Promise<void>);
};

function CreateLabel({ color, setColor, handleKeyDown }: CreateLabelProps) {
  const { canStartLoading, endLoading } = useLoading();
  const { addToast } = useToastStore();
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
        onKeyDown={async (e) => {
          e.stopPropagation();
          if (e.key === 'Enter') {
            if (inputRef.current) {
              if (canStartLoading()) {
                return;
              }
              await postCreateLabel(color, inputRef.current.value).finally(() =>
                endLoading(),
              );
              handleCreate();
            } else {
              addToast({
                duration: 300,
                message: '라벨을 입력해 주세요',
                type: 'ERROR',
              });
            }
          }
        }}
        ref={inputRef}
      />
    </CreateDiv>
  );
}

export default CreateLabel;
