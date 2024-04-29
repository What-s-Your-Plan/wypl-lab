import { Dispatch, SetStateAction } from 'react';
import ColorCircle from '@/components/common/ColorCircle';
import { LabelColorsType, BgColors } from '@/assets/styles/colorThemes';
import PopOver from '@/components/common/PopOver';
import PalettePanel from '@/components/color/PalettePanel';

type Props = {
  color: LabelColorsType;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
};

function ColorSelectButton({ color, setColor }: Props) {
  const changeColor = (color: LabelColorsType) => {
    setColor(color);
  };
  return (
    <PopOver
      button={
        <ColorCircle
          as="button"
          $bgColor={color as BgColors}
          $cursor="pointer"
        />
      }
      panel={<PalettePanel setColor={changeColor} />}
    />
  );
}

export default ColorSelectButton;
