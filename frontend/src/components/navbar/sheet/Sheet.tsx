import closeIcon from '@/assets/icons/x.svg';

import * as S from './Sheet.styled';

type Props = {
  childrenComponent: JSX.Element;
  resetSheetEvent: () => void;
};

function Sheet({ childrenComponent, resetSheetEvent }: Props) {
  return (
    <S.Container>
      <S.OuterArea onClick={resetSheetEvent} />
      <S.Sheet>
        <S.CloseButton onClick={resetSheetEvent}>
          <S.CloseIcon src={closeIcon} alt={'icon'} />
        </S.CloseButton>
        {childrenComponent}
      </S.Sheet>
    </S.Container>
  );
}

export default Sheet;
