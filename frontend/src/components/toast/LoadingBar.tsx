import { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const LoadingBarContainer = styled.div`
  ${tw`
        h-[5px]
        mt-2
        w-full
        overflow-hidden
    `}
`;

const LoadingBarProgress = styled.div<{ width: number }>`
  ${tw`
    h-5
    bg-default-coolgray
  `}
  width: ${(props) => props.width}%;
  transition: width 1ms ease-in-out;
`;

type LoadingBarProps = {
  initialTime: number;
};

function LoadingBar({ initialTime }: LoadingBarProps) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => Math.max(prevWidth - 100 / initialTime, 0));
    }, 10);
    return () => clearInterval(interval);
  }, [initialTime]);

  return (
    <LoadingBarContainer>
      <LoadingBarProgress width={width} />
    </LoadingBarContainer>
  );
}

export default LoadingBar;
