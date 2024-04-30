import { useEffect, useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import * as S from '@/components/common/Container';
import Button from '../common/Button';
import WGoal from './WGoal';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function WidgetList() {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<ReactGridLayout.Layouts>();
  const [widgetArray, setWidgetArray] = useState<Widget[]>([
    { widgetType: 'goal', layout: { i: 'widget1', x: 0, y: 0, w: 2, h: 1 } },
    { widgetType: 'goal', layout: { i: 'widget1', x: 0, y: 0, w: 2, h: 1 } },
    { widgetType: 'goal', layout: { i: 'widget1', x: 0, y: 0, w: 2, h: 1 } },
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
      setIsModifying(true);
    }, 1500);
  };

  const clearPressTimer = () => {
    if (pressTimer.current !== null) {
      clearTimeout(pressTimer.current);
    }
  };

  const renderWidget = (widgetType: string) => {
    switch (widgetType) {
      case 'goal':
        return <WGoal />;
      case 'schedule':
        return <div>Schedule</div>;
      case 'todo':
        return <div>Todo</div>;
      default:
        return <div>Unknown</div>;
    }
  };

  useEffect(() => {
    console.log('isModifying is now', isModifying);
  }, [isModifying]);

  return (
    <S.Container $width="300">
      <div className="flex justify-end">
        {isModifying && (
          <Button
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
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        isDraggable={isModifying}
        isResizable={isModifying}
        cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          const containerClasses = `reactGridItem`;
          const animationClasses = `${isModifying ? 'shaking' : ''}`;
          return (
            <div
              className={containerClasses}
              key={index}
              data-grid={{
                x: widget?.layout.x,
                y: widget?.layout.y,
                w: widget?.layout.w,
                h: widget?.layout.h,
                i: widget.layout.i,
                minW: 1,
                maxW: 2,
                minH: 1,
                maxH: 2,
                isDraggable: { isModifying },
                isResizable: { isModifying },
              }}
              onMouseDownCapture={handleLongPress}
              onMouseUpCapture={clearPressTimer}
              onMouseLeave={clearPressTimer}
              onTouchStart={handleLongPress}
              onTouchEnd={clearPressTimer}
            >
              <S.WhiteContainer
                $width="1300"
                $height="half"
                className={animationClasses}
              >
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
