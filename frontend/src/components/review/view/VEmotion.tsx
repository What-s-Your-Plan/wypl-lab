import { WhiteContainer } from '@/components/common/Container';
import { EmotionContent } from '@/objects/Content';

import Smiley from '@/assets/icons/smiley.svg';
import Bad from '@/assets/icons/emoji/bad.svg';
import Congrats from '@/assets/icons/emoji/congrats.svg';
import Cry from '@/assets/icons/emoji/cry.svg';
import Funny from '@/assets/icons/emoji/funny.svg';
import Noone from '@/assets/icons/emoji/noone.svg';
import Nyah from '@/assets/icons/emoji/nyah.svg';
import Sick from '@/assets/icons/emoji/sick.svg';
import Smile from '@/assets/icons/emoji/smile.svg';
import Stareyes from '@/assets/icons/emoji/stareyes.svg';
import Tired from '@/assets/icons/emoji/tired.svg';
import Question from '@/assets/icons/emoji/question.svg';

type VEmotionProps = {
  content: EmotionContent;
};

function VEmotion({ content }: VEmotionProps) {
  const renderEmoji = (emoji: string) => {
    switch (emoji) {
      case 'Funny':
        return <img src={Funny} alt="기분" className="w-10" />;
      case 'Smile':
        return <img src={Smile} alt="기분" className="w-10" />;
      case 'Bad':
        return <img src={Bad} alt="기분" className="w-10" />;
      case 'Tired':
        return <img src={Tired} alt="기분" className="w-10" />;
      case 'Cry':
        return <img src={Cry} alt="기분" className="w-10" />;
      case 'Stareyes':
        return <img src={Stareyes} alt="기분" className="w-10" />;
      case 'Nyah':
        return <img src={Nyah} alt="기분" className="w-10" />;
      case 'Congrats':
        return <img src={Congrats} alt="기분" className="w-10" />;
      case 'Sick':
        return <img src={Sick} alt="기분" className="w-10" />;
      case 'Noone':
        return <img src={Noone} alt="기분" className="w-10" />;
      default:
        return <img src={Question} alt="기분" className="w-10" />;
    }
  };

  return (
    <WhiteContainer $width="900">
      <div className="flex flex-row">
        <img src={Smiley} alt="기분" className="w-5 mr-2" />
        <span>오늘의 기분</span>
      </div>
      {renderEmoji(content.emoji)}
      {content.description}
    </WhiteContainer>
  );
}

export default VEmotion;
