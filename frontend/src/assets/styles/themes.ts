import tw from 'twin.macro';

const ButtonSizeTheme = {
  none: tw`bg-transparent border-0`,
  sm: tw`h-11 shadow-md`,
  lg: tw`h-14 shadow-md`,
};

const BgTheme = {
  labelRed: tw`bg-label-red`,
  labelPink: tw`bg-label-pink`,
  labelOrange: tw`bg-label-orange`,
  labelYellow: tw`bg-label-yellow`,
  labelGreen: tw`bg-label-green`,
  labelLeaf: tw`bg-label-leaf`,
  labelBlue: tw`bg-label-blue`,
  labelSky: tw`bg-label-sky`,
  labelNavy: tw`bg-label-navy`,
  labelIndigo: tw`bg-label-indigo`,
  labelPurple: tw`bg-label-purple`,
  labelLavender: tw`bg-label-lavender`,
  labelCharcoal: tw`bg-label-charcoal`,
  labelBrown: tw`bg-label-brown`,
  white: tw`bg-default-white`,
  black: tw`bg-default-black`,
  main: tw`bg-main`,
};

const TextTheme = {
  labelRed: tw`text-label-red`,
  labelPink: tw`text-label-pink`,
  labelOrange: tw`text-label-orange`,
  labelYellow: tw`text-label-yellow`,
  labelGreen: tw`text-label-green`,
  labelLeaf: tw`text-label-leaf`,
  labelBlue: tw`text-label-blue`,
  labelSky: tw`text-label-sky`,
  labelNavy: tw`text-label-navy`,
  labelIndigo: tw`text-label-indigo`,
  labelPurple: tw`text-label-purple`,
  labelLavender: tw`text-label-lavender`,
  labelCharcoal: tw`text-label-charcoal`,
  labelBrown: tw`text-label-brown`,
  white: tw`text-default-white`,
  black: tw`text-default-black`,
  main: tw`text-main`,
};

export type ButtonSize = keyof typeof ButtonSizeTheme;

export type Colors = keyof typeof BgTheme;

export { ButtonSizeTheme, BgTheme, TextTheme };
