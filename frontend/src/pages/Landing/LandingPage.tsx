import Responsive from './Responsive';

import GoogleOAuthButton from './button/GoogleOAuthButton';

import {
  Container,
  BlackTextStyle,
  CalendarStyle,
  ContentStyle,
  DetailTextStyle,
  DateItemStyle,
  FirstItemStyle,
  IntroductionStyle,
  SecondItemStyle,
  TitleStyle,
  ThirdItemStyle,
  WhiteTextStyle,
} from './LandingPage.styled';

function LandingPage() {
  const getThisDate = (): string => {
    const month: number = new Date().getMonth() + 1;
    const day: number = new Date().getDate();
    return month + '월 ' + day + '일';
  };

  return (
    <Container>
      <ContentStyle className="scrollBar">
        <Responsive type="laptop">
          <CalendarStyle>
            <DateItemStyle>{getThisDate()}</DateItemStyle>
            <FirstItemStyle>운동 일정</FirstItemStyle>
            <SecondItemStyle>스터디 일정</SecondItemStyle>
            <ThirdItemStyle>동아리 일정</ThirdItemStyle>
          </CalendarStyle>
        </Responsive>
        <IntroductionStyle>
          <TitleStyle>
            <BlackTextStyle>What is</BlackTextStyle>
            <br />
            <BlackTextStyle>Your Plan!</BlackTextStyle>
            <br />
            <WhiteTextStyle>계획할때</WhiteTextStyle>
            <br />
            <BlackTextStyle>와플</BlackTextStyle>
            <br />
          </TitleStyle>
          <DetailTextStyle>
            캘린더 플랫폼 WYPL은 달력과 라벨을 이용하여 <br />
            누구나 자신의 일정을 공유 및 회고할 수 있습니다.
          </DetailTextStyle>
          <GoogleOAuthButton />
        </IntroductionStyle>
      </ContentStyle>
    </Container>
  );
}

export default LandingPage;
