import * as GNS from '../GlobalNavBar.styled';
import * as S from './MemberBar.styled';

import NotificationSvg from '@/assets/icons/alarmClock.svg';

function MemberBar() {
  /* TODO: 디폴트 유저 이미지 정하기 */
  const imageUrl: string =
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20210309%2Foriginal%2Fpngtree-a-cute-little-tabby-cat-png-image_5803658.jpg&type=sc960_832';

  return (
    <S.Container>
      <GNS.Button>
        <GNS.Image src={NotificationSvg} alt={'알림'}></GNS.Image>
      </GNS.Button>
      <GNS.Button>
        <S.ProfileImage src={imageUrl} alt={'회원'}></S.ProfileImage>
      </GNS.Button>
    </S.Container>
  );
}

export default MemberBar;
