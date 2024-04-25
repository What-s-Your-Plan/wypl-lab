import * as S from '@/components/common/Container';

type Props = {};

function WriteBlockList({}: Props) {
  return (
    <S.Container $width="800" className="scrollBar">
      <div>
        <S.WhiteContainer $width="1300" />
      </div>
    </S.Container>
  );
}

export default WriteBlockList;
