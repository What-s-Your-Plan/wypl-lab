import styled from 'styled-components';

const Text = styled.span.attrs({
  className:
    'absolute bg-default-black text-default-white text-xs rounded py-1 px-2 z-50 opacity-0',
})`
  width: max-content;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const Container = styled.span.attrs({
  className: 'relative flex items-center',
})`
  &:hover ${Text} {
    opacity: 1;
  }
`;

export { Container, Text };
