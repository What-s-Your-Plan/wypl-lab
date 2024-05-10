import { WhiteContainer } from '@/components/common/Container';
import { EmotionContent } from '@/objects/Content';

type VEmotionProps = {
  content: EmotionContent;
};

function VEmotion({ content }: VEmotionProps) {
  return (
    <WhiteContainer $width="900">
      <img src={content.emoji} alt="기분" className="w-10" />
      {content.description}
    </WhiteContainer>
  );
}

export default VEmotion;
