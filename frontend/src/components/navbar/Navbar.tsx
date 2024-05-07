import { useNavigate } from 'react-router-dom';

import MemberBar from './MemberBar/MemberBar';
import ArticleBar from './ArticleBar/ArticleBar';

import * as S from './Navbar.styled';

function Navbar() {
  const navigate = useNavigate();

  return (
    <S.Container>
      {/* TODO: 이미지 로고와 WYPL 이름 같이 넣기 고민할 점은 세로로 할지, 가로로 할지 */}
      <S.Logo
        onClick={() => navigate('./calendar')}
        src={'./logo-ci.png'}
      ></S.Logo>
      <S.ContentWrapper>
        <ArticleBar />
        <MemberBar />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Navbar;
