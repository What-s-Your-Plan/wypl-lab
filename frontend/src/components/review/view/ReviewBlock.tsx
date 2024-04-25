import { ReactNode } from 'react';

import { WhiteContainer } from '@/components/common/Container';

type Props = {
  icon: string;
  title: string;
  content: ReactNode;
};

function ReviewBlock({ icon, title, content }: Props) {
  return (
    <WhiteContainer $width="1300" className="flex flex-col">
      <div className="flex ">
        <img src={icon} className="w-5 mr-2" />
        <span>{title}</span>
      </div>
      <div className="text-sm my-1">{content}</div>
    </WhiteContainer>
  );
}

export default ReviewBlock;
