import * as S from './NavButton.styled';

export type NavButtonProps = {
  imageUrl: string;
  alt: string;
  event: () => void;
};

function NavButton({ imageUrl, alt, event }: NavButtonProps) {
  return (
    <S.Container>
      <S.Button onClick={() => event()}>
        <S.Image src={imageUrl} alt={alt}></S.Image>
      </S.Button>
    </S.Container>
  );
}

export default NavButton;
