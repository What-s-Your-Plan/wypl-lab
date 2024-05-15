import React from 'react';

import * as S from './Tooltip.styled';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <S.Container>
      {children}
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default Tooltip;
