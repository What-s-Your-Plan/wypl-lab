import styled from 'styled-components';
import tw from 'twin.macro';

const flex = {
  row: `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  column: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const itemStyle = `
  position: relative;
  transform: translateX(-100%);

  width: 50rem;
  height: 12.5rem;
  padding: 1rem;

  font-size: 2.5rem;
  font-weight: 600;
  text-align: right;

  opacity: 0;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation-name: slideIn;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const colors = {
  YELLOW_500: '#F4BD68',
  WHITE: '#ffffff',
  GRAY_400: '#ced4da',
  GRAY_500: '#adb5bd',
  BLACK: '#000000',
  ORANGE_500: '#EE6C4C',
  BLUE_500: '#88B6B9',
};

const Container = styled.div`
  ${tw`
    relative

    flex
    justify-center
    items-center

    bg-default-white
    overflow-y-auto

    h-full
    w-full
    `}
`;

const ContentStyle = styled.div`
  ${flex.row};

  width: 100vw;
  height: 100vh;
  padding: 0 6.25rem;
`;

const CalendarStyle = styled.div`
  ${flex.column};

  gap: 0.5rem;
  position: relative;
  left: -20%;
  top: -2.5rem;

  width: 50rem;
  border: 1px solid ${colors.GRAY_400};
  box-sizing: content-box;
  box-shadow: 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.25);

  opacity: 0;

  transform: rotate(10deg);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const DateItemStyle = styled.div`
  width: 50rem;
  height: 7.5rem;
  padding: 1.5rem 1.5rem 1rem;

  background: ${colors.WHITE};

  font-size: 5rem;
  text-align: right;
`;

const FirstItemStyle = styled.div`
  ${itemStyle};

  background: ${colors.YELLOW_500};

  animation-delay: 0.5s;
`;

const SecondItemStyle = styled.div`
  ${itemStyle};

  background: ${colors.ORANGE_500};

  animation-delay: 1s;
`;

const ThirdItemStyle = styled.div`
  ${itemStyle};

  background: ${colors.BLUE_500};

  animation-delay: 1.5s;
`;

const IntroductionStyle = styled.div`
  ${flex.column}

  align-items: flex-start;
  gap: 3.75rem;

  width: 100%;

  align-items: flex-end;
  gap: 1.5rem;
  text-align: right;
`;

const BlackTextStyle = styled.span`
  width: 100%;

  font-size: 5rem;
  font-weight: 700;
  line-height: 6.25rem;
  color: ${colors.BLACK};
  text-shadow: 1.25px 1.25px 2.5px rgba(0, 0, 0, 0.25);
`;

const WhiteTextStyle = styled.span`
  width: 100%;

  font-size: 5rem;
  font-weight: 700;
  line-height: 6.25rem;
  color: ${colors.WHITE};
  text-shadow: 1.25px 1.25px 2.5px rgba(0, 0, 0, 0.25);
`;

const DetailTextStyle = styled.span`
  font-size: 1rem;
  color: ${colors.GRAY_500};
  line-height: 120%;
`;

export {
  Container,
  BlackTextStyle,
  CalendarStyle,
  ContentStyle,
  DetailTextStyle,
  DateItemStyle,
  FirstItemStyle,
  IntroductionStyle,
  SecondItemStyle,
  ThirdItemStyle,
  WhiteTextStyle,
};
