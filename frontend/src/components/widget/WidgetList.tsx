import { useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import * as S from '@/components/common/Container';
import Button from '../common/Button';
import WFilter from './WFilter';
import WGoal from './WGoal';
import WDDay from './WDDay';
import WWeather from './WWeather';
import WMemo from './WMemo';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function WidgetList() {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<ReactGridLayout.Layouts>();
  const [widgetArray, setWidgetArray] = useState<Widget[]>([
    { widgetType: 'filter', layout: { i: 'widget1', x: 0, y: 0, w: 2, h: 3 } },
    { widgetType: 'goal', layout: { i: 'widget1', x: 0, y: 0, w: 2, h: 2 } },
    { widgetType: 'dday', layout: { i: 'widget1', x: 0, y: 0, w: 1, h: 2 } },
    { widgetType: 'weather', layout: { i: 'widget1', x: 1, y: 1, w: 1, h: 2 } },
    { widgetType: 'memo', layout: { i: 'widget1', x: 0, y: 2, w: 2, h: 3 } },
  ]);

  const handleModify = (
    currentLayout: ReactGridLayout.Layout[],
    allLayouts: ReactGridLayout.Layouts,
  ) => {
    const tempArray = widgetArray;
    setLayouts(allLayouts);
    currentLayout?.map((position) => {
      tempArray[Number(position.i)].layout.x = position.x;
      tempArray[Number(position.i)].layout.y = position.y;
      tempArray[Number(position.i)].layout.w = position.w;
      tempArray[Number(position.i)].layout.h = position.h;
    });
    setWidgetArray(tempArray);
  };

  // 길게 누르기 위한 타이머 참조
  const pressTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleLongPress = () => {
    pressTimer.current = setTimeout(() => {
      setIsModifying(false); // 추후 이동하고 싶으면 해당 함수를 `true`로 수정합니다.
    }, 1500);
  };

  const clearPressTimer = () => {
    if (pressTimer.current !== null) {
      clearTimeout(pressTimer.current);
    }
  };

  const renderWidget = (widgetType: string) => {
    switch (widgetType) {
      case 'filter':
        return <WFilter />;
      case 'goal':
        return <WGoal />;
      case 'dday':
        return <WDDay />;
      case 'todo':
        return <div>Todo</div>;
      case 'weather':
        return <WWeather />;
      case 'memo':
        return <WMemo />;
      default:
        return <div>Unknown</div>;
    }
  };

  return (
    <S.Container $width="left" className="!p-2">
      <div className="flex justify-end z-50 sticky float-right">
        {isModifying && (
          <Button
            className="float-end"
            $size="sm"
            $width="50px"
            onClick={() => setIsModifying(false)}
          >
            저장
          </Button>
        )}
      </div>
      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layouts={layouts}
        rowHeight={50}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        isDraggable={isModifying}
        isResizable={isModifying}
        cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [10, 10],
          md: [10, 10],
          sm: [10, 10],
          xs: [10, 10],
          xxs: [10, 10],
        }}
      >
        {widgetArray?.map((widget, index) => {
          const animationClasses = `h-full ${isModifying ? 'shaking' : ''}`;
          return (
            <div
              className="reactGridItem"
              key={index}
              data-grid={{
                x: widget.layout.x,
                y: widget.layout.y,
                w: widget.layout.w,
                h: widget.layout.h,
                i: widget.layout.i,
                minW: 1,
                maxW: 4,
                minH: 1,
                maxH: 4,
                isDraggable: { isModifying },
                isResizable: { isModifying },
              }}
              onMouseDownCapture={handleLongPress}
              onMouseUpCapture={clearPressTimer}
              onMouseLeave={clearPressTimer}
              onTouchStart={handleLongPress}
              onTouchEnd={clearPressTimer}
            >
              <S.WhiteContainer $width="1300" className={animationClasses}>
                {renderWidget(widget.widgetType)}
              </S.WhiteContainer>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </S.Container>
  );
}

export default WidgetList;
