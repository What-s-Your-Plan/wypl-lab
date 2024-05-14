import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    flex
    flex-col

    items-center

    w-[80%]
    h-[120px]

    rounded-[20px]
    p-2
    border
    border-slate-300
  `}
`;

const SelectLabelColorWrapper = styled.div`
  ${tw`
        flex
        flex-row
        
        items-center
        justify-center
        w-[100px]
    `}
`;

const LabelColor = styled.div`
  ${tw`
        w-4
        h-4
        rounded-full
    `}
`;

const SelectLabelColorsWrapper = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
    
    w-full
    h-full
  `}
`;

const SelectLabelColorsBox = styled.div`
  ${tw`
    flex
    flex-row
    
    justify-around
    items-center
    w-full
    h-full
    
    mt-1
  `}
`;

const SelectLabelColor = styled.div``;

const Icon = styled.img`
  ${tw`
    fixed
  `}
`;

export {
  Container,
  SelectLabelColorWrapper,
  LabelColor,
  SelectLabelColorsWrapper,
  SelectLabelColorsBox,
  SelectLabelColor,
  Icon,
};
