import tw from 'twin.macro';

const ButtonSizeTheme = {
  none: tw`bg-transparent border-0`,
  sm: tw`h-[30px] shadow-md`,
  lg: tw`h-[38px] shadow-md`,
};

export type ButtonSize = keyof typeof ButtonSizeTheme;

export { ButtonSizeTheme };
