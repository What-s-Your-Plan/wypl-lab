import tw from 'twin.macro';
import styled from 'styled-components';

const Panel = styled.div`
  ${tw`
    grid
    grid-cols-2
    w-16
    bg-default-warmgray
    rounded-lg
    shadow-lg
  `}
`

const Element = styled.div`
  ${tw`
    flex
    justify-center
    items-center
    size-8
  `}
`

export { Panel, Element }