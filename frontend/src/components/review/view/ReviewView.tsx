import { ReactNode } from 'react';

import { WhiteContainer } from '@/components/common/Container';

type ReviewBlockProps = {
  icon: string;
  blockType: string;
  title: string;
  content: ReactNode;
};

function ReviewView({ icon, blockType, title, content }: ReviewBlockProps) {
  return (
    <div
      draggable={true}
      onDragStart={(e: React.DragEvent) =>
        e.dataTransfer.setData('blockType', blockType)
      }
    >
      <WhiteContainer $width="1300" className="flex flex-col">
        <div className="flex">
          <img src={icon} className="w-5 mr-2" />
          <span>{title}</span>
        </div>
        <div className="text-sm my-1">{content}</div>
      </WhiteContainer>
    </div>
  );
}

export default ReviewView;
