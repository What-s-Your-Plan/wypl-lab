import * as GNS from '../GlobalNavBar.styled';
import * as S from './ArticleBar.styled';

import CalendarSvg from '@/assets/icons/calendar.svg';
import GroupSvg from '@/assets/icons/users.svg';
import NotepadSvg from '@/assets/icons/notePad.svg';

function ArticleBar() {
  return (
    <S.Container>
      {/* TODO: GNS.Button, GNS.Image 분리하기 */}
      <GNS.Button>
        <GNS.Image src={CalendarSvg} alt={'캘린더'}></GNS.Image>
      </GNS.Button>
      <GNS.Button>
        <GNS.Image src={GroupSvg} alt={'그룹'}></GNS.Image>
      </GNS.Button>
      <GNS.Button>
        <GNS.Image src={NotepadSvg} alt={'회고'}></GNS.Image>
      </GNS.Button>
    </S.Container>
  );
}

export default ArticleBar;
