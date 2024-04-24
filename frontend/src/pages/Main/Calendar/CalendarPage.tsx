import * as S from '@/components/common/Container';

function CalendarPage() {
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <S.Container $width="s">작고</S.Container>
        <S.Container $width="m">중간</S.Container>
      </div>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <S.Container $width="f">가득이요</S.Container>
      </div>
    </>
  );
}

export default CalendarPage;
