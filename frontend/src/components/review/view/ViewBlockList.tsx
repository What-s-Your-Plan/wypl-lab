import { ReactNode } from 'react';

import { Container } from '@/components/common/Container';
import ReviewView from '@/components/review/view/ReviewView';
import TextAlignLeft from '@/assets/icons/textAlignLeft.svg';
import Image from '@/assets/icons/image.svg';
import Smiley from '@/assets/icons/smiley.svg';
import SunDim from '@/assets/icons/sunDim.svg';
import Pen from '@/assets/icons/pen.svg';

function BlockList() {
  const blocks = [
    {
      icon: TextAlignLeft,
      blockType: 'text',
      title: '텍스트 박스',
      content: <div>텍스트를 작성할 수 있습니다</div>,
    },
    {
      icon: Image,
      blockType: 'picture',
      title: '사진',
      content: <div>사진을 통해 더욱 생생한 기억</div>,
    },
    {
      icon: Smiley,
      blockType: 'emotion',
      title: '오늘의 기분',
      content: <div>오늘 당신의 기분은 어땠나요?</div>,
    },
    {
      icon: SunDim,
      blockType: 'weather',
      title: '오늘의 날씨',
      content: <div>오늘 날씨는 어땠나요?</div>,
    },
    {
      icon: Pen,
      blockType: 'kpt',
      title: 'KPT 회고',
      content: <div>Keep Problem Try 세가지로 일정을 회고해보세요</div>,
    },
    {
      icon: Pen,
      blockType: '4f',
      title: '4F 회고',
      content: (
        <div>
          사실(Facts), 느낌(Feelings), 찾아낸 점(Findings),미래의
          행동(Futureactions) 으로 일정을 회고해보세요
        </div>
      ),
    },
  ];

  const renderBlock = () => {
    const blockList: ReactNode[] = [];
    blocks.forEach((block, index) => {
      blockList.push(
        <ReviewView
          key={index}
          icon={block.icon}
          blockType={block.blockType}
          title={block.title}
          content={block.content}
        />,
      );
    });
    return blockList;
  };

  return (
    <Container $width="left" className="scrollBar ss:max-sm:!h-40">
      {renderBlock()}
    </Container>
  );
}

export default BlockList;
