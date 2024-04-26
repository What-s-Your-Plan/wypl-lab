import { ReactNode } from 'react';

import { Container } from '@/components/common/Container';
import ReviewBlock from './ReviewBlock';

import TextHOne from '@/assets/icons/textHOne.svg';
import TextAlignLeft from '@/assets/icons/textAlignLeft.svg';
import Image from '@/assets/icons/image.svg';
import Smiley from '@/assets/icons/smiley.svg';
import SunDim from '@/assets/icons/sunDim.svg';

function BlockList() {
  const blocks = [
    {
      icon: TextHOne,
      type: 'title',
      title: '제목',
      content: <div>제목을 입력하세요</div>,
    },
    {
      icon: TextAlignLeft,
      type: 'text',
      title: '텍스트 박스',
      content: <div>텍스트를 작성할 수 있습니다</div>,
    },
    {
      icon: Image,
      type: 'picture',
      title: '사진',
      content: <div>사진을 통해 더욱 생생한 기억</div>,
    },
    {
      icon: Smiley,
      type: 'emotion',
      title: '오늘의 기분',
      content: <div>오늘 당신의 기분은 어땠나요?</div>,
    },
    {
      icon: SunDim,
      type: 'weather',
      title: '오늘의 날씨',
      content: <div>오늘 날씨는 어땠나요?</div>,
    },
  ];

  const renderBlock = () => {
    const blockList: ReactNode[] = [];
    blocks.forEach((block) => {
      blockList.push(
        <ReviewBlock
          icon={block.icon}
          type={block.type}
          title={block.title}
          content={block.content}
        />,
      );
    });
    return blockList;
  };

  return (
    <Container $width="300" className="scrollBar">
      {renderBlock()}
    </Container>
  );
}

export default BlockList;
