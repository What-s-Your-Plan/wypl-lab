import {
  LabelColors,
  LabelColorsType,
  BgColors,
} from '@/assets/styles/colorThemes';
import * as S from '@/components/color/PalettePanelStyle';
import ColorCircle from '@/components/common/ColorCircle';

type PalettePanelProps = {
  setColor: (color: LabelColorsType) => void;
};

function PalettePanel({ setColor }: PalettePanelProps) {
  const renderColors = () => {
    return LabelColors.map((color) => {
      return (
        <S.Element key={color}>
          <ColorCircle
            $bgColor={color as BgColors}
            $cursor="pointer"
            onClick={() => {
              setColor(color);
            }}
          />
        </S.Element>
      );
    });
  };
  return <S.Panel>{renderColors()}</S.Panel>;
}

export default PalettePanel;
