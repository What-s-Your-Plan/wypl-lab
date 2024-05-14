import {
  LabelColorsType,
  BgColors,
} from '@/assets/styles/colorThemes';
import * as S from '@/components/color/PalettePanelStyle';
import ColorCircle from '@/components/common/ColorCircle';

type PalettePanelProps = {
  setColor: (color: LabelColorsType) => void;
};

const palette = [
  'labelRed',
  'labelPink',
  'labelOrange',
  'labelYellow',
  'labelGreen',
  'labelLeaf',
  'labelBlue',
  'labelSky',
  'labelNavy',
  'labelIndigo',
  'labelPurple',
  'labelLavender',
  'labelCharcoal',
  'labelBrown'
]

function PalettePanel({ setColor }: PalettePanelProps) {
  const renderColors = () => {
    return palette.map((color) => {
      return (
        <S.Element key={color}>
          <ColorCircle
            $bgColor={color as BgColors}
            $cursor="pointer"
            onClick={() => {
              setColor(color as LabelColorsType);
            }}
          />
        </S.Element>
      );
    });
  };
  return <S.Panel>{renderColors()}</S.Panel>;
}

export default PalettePanel;
