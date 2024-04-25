import * as S from '@/components/common/Container';

function CalendarPage() {
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <S.Container $width="300">작고</S.Container>
        <S.Container $width="800">중간</S.Container>
      </div>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <S.Container $width="1100">가득이요</S.Container>
      </div>
    </>
  );
}

export default CalendarPage;
