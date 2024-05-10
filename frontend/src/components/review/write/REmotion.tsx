import useReviewStore from '@/stores/ReviewStore';

import { WhiteContainer } from '@/components/common/Container';
import { InputDefault } from '@/components/common/InputText';
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

type REmotionProps = {
  index: number;
  content: EmotionContent;
};

function REmotion({ index, content }: REmotionProps) {
  const { setContent } = useReviewStore();
  const handleEmoji = (emoji: string) => {
    const newContent = content;
    newContent.emoji = emoji;
    setContent(index, newContent);
  };

  const handleTextInput = (description: string) => {
    const newContent = content;
    newContent.description = description;
    setContent(index, newContent);
  };

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
      <div className="flex flex-row flex-wrap items-center">
        <div>
          <div className="mx-10 mt-5 mb-1 flex gap-3">
            <button onClick={() => handleEmoji('Funny')}>
              <img src={Funny} alt="즐거움" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Smile')}>
              <img src={Smile} alt="좋음" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Bad')}>
              <img src={Bad} alt="나쁨" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Tired')}>
              <img src={Tired} alt="피곤함" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Cry')}>
              <img src={Cry} alt="울음" className="w-8" />
            </button>
          </div>
          <div className="mx-10 mb-5 flex gap-3">
            <button onClick={() => handleEmoji('Stareyes')}>
              <img src={Stareyes} alt="신세계" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Nyah')}>
              <img src={Nyah} alt="신남" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Congrats')}>
              <img src={Congrats} alt="축하" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Sick')}>
              <img src={Sick} alt="아픔" className="w-8" />
            </button>
            <button onClick={() => handleEmoji('Noone')}>
              <img src={Noone} alt="혼자 있고 싶음" className="w-8" />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {renderEmoji(content.emoji)}
          <InputDefault
            placeholder="오늘의 기분을 입력해주세요"
            className="!h-10"
            value={content.description}
            onChange={(e) => handleTextInput(e.target.value)}
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default REmotion;
