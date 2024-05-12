import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    flex
    justify-center
    items-start

    w-[80%]
    h-[120px]

    rounded-[20px]
    p-2
  `}

  border-color: #00000033;
  border-width: 1px;
`;

const SelectLabelColorWrapper = styled.div`
  ${tw`
        flex
        flex-row
        
        items-center
        w-[120px]
    `}
`;

const LabelColor = styled.div`
  ${tw`
        w-4
        h-4
        rounded-full
    `}
`;

export { Container, SelectLabelColorWrapper, LabelColor };
