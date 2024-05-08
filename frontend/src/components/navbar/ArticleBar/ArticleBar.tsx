import { useNavigate } from 'react-router-dom';

import NavButton, { NavButtonProps } from '../common/NavButton';

import * as S from './ArticleBar.styled';

import CalendarSvg from '@/assets/icons/calendar.svg';
import GroupSvg from '@/assets/icons/users.svg';
import NotepadSvg from '@/assets/icons/notePad.svg';
import NotificationSvg from '@/assets/icons/bell.svg';

function NavEventBar() {
  const navigate = useNavigate();

  const goto = (url: string): void => {
    navigate(url);
  };

  const contentButtons: NavButtonProps[] = [
    {
      imageUrl: CalendarSvg,
      alt: '캘린더',
      event: () => goto('./calendar'),
    },
    {
      imageUrl: GroupSvg,
      alt: '그룹',
      event: () => goto('./group'),
    },
    {
      imageUrl: NotepadSvg,
      alt: '리뷰',
      event: () => goto('./review'),
    },
  ];

  const memberButtons: NavButtonProps[] = [
    {
      imageUrl: NotificationSvg,
      alt: '알림',
      event: () => console.log('회원 알림'),
    },
    {
      // TODO: imageUrl은 추후 사용자의 이미지로 수정
      imageUrl: NotificationSvg,
      alt: '회원',
      event: () => console.log('회원 프로필'),
    },
  ];

  return (
    <S.Container>
      <S.Wrapper>
        {contentButtons.map((value: NavButtonProps, idx: number) => {
          return <NavButton key={idx} {...value} />;
        })}
      </S.Wrapper>
      <S.Wrapper>
        {memberButtons.map((value: NavButtonProps, idx: number) => {
          return <NavButton key={idx} {...value} />;
        })}
      </S.Wrapper>
    </S.Container>
  );
}

export default NavEventBar;
