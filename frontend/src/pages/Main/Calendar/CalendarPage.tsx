import * as S from '@/components/common/Container';
import WidgetList from '@/components/widget/WidgetList';

function CalendarPage() {
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <WidgetList />
        <S.Container $width="800">중간</S.Container>
      </div>
    </>
  );
}

export default CalendarPage;
