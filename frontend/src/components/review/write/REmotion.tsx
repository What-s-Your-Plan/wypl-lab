import { WhiteContainer } from '@/components/common/Container';
import { InputDefault } from '@/components/common/InputText';

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

function REmotion() {
  return (
    <WhiteContainer $width="900">
      <div className="flex flex-row">
        <img src={Smiley} alt="기분" className="w-5 mr-2" />
        <span>오늘의 기분</span>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <div className="mx-10 mt-5 mb-1 flex gap-3">
            <button>
              <img src={Bad} alt="나쁨" className="w-8" />
            </button>
            <button>
              <img src={Congrats} alt="축하" className="w-8" />
            </button>
            <button>
              <img src={Cry} alt="울음" className="w-8" />
            </button>
            <button>
              <img src={Funny} alt="즐거움" className="w-8" />
            </button>
            <button>
              <img src={Noone} alt="혼자 있고 싶음" className="w-8" />
            </button>
          </div>
          <div className="mx-10 mb-5 flex gap-3">
            <button>
              <img src={Nyah} alt="신남" className="w-8" />
            </button>
            <button>
              <img src={Sick} alt="아픔" className="w-8" />
            </button>
            <button>
              <img src={Smile} alt="신세계" className="w-8" />
            </button>
            <button>
              <img src={Stareyes} alt="신세계" className="w-8" />
            </button>
            <button>
              <img src={Tired} alt="피곤함" className="w-8" />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={Nyah} alt="신남" className="w-10" />
          <InputDefault
            placeholder="오늘의 기분을 입력해주세요"
            className="!h-10"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default REmotion;
