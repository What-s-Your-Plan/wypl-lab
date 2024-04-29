import { Dispatch, SetStateAction } from 'react';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import ColorSelectButton from '@/components/color/ColorSelectButton';
import { CreateDiv } from '@/components/label/CreateLabelStyle';
import { InputDefault } from '../common/InputText';

type Props = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
};

function CreateLabel({ color, setColor }: Props) {
  return (
    <CreateDiv>
      <ColorSelectButton color={color} setColor={setColor} />
      <InputDefault $void={true} maxLength={15} />
    </CreateDiv>
  );
}

export default CreateLabel;
