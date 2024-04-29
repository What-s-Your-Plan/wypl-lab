import tw from 'twin.macro';

const LabelColors = [
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
  'labelBrown',
] as const

const AllColors = [
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
  'labelBrown',
  'white',
  'black',
  'main',
] as const

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

const BorderTheme = {
  labelRed: tw`border border-label-red`,
  labelPink: tw`border border-label-pink`,
  labelOrange: tw`border border-label-orange`,
  labelYellow: tw`border border-label-yellow`,
  labelGreen: tw`border border-label-green`,
  labelLeaf: tw`border border-label-leaf`,
  labelBlue: tw`border border-label-blue`,
  labelSky: tw`border border-label-sky`,
  labelNavy: tw`border border-label-navy`,
  labelIndigo: tw`border border-label-indigo`,
  labelPurple: tw`border border-label-purple`,
  labelLavender: tw`border border-label-lavender`,
  labelCharcoal: tw`border border-label-charcoal`,
  labelBrown: tw`border border-label-brown`,
  white: tw`border border-default-white`,
  black: tw`border border-default-black`,
  main: tw`border border-main`,
};

export type AllColorsType = typeof AllColors[number];

export type LabelColorsType = typeof LabelColors[number];

export type BgColors = keyof typeof BgTheme;

export type TextColors = keyof typeof TextTheme;

export type BorderColors = keyof typeof BorderTheme;

export { AllColors, LabelColors, BgTheme, TextTheme, BorderTheme };
