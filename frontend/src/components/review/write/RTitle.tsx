import { WhiteContainer } from '@/components/common/Container';
import { InputTitle } from '@/components/common/InputText';

function RTitle() {
  return (
    <WhiteContainer $width="900">
      <InputTitle placeholder="제목을 입력해주세요" $width="100%" />
    </WhiteContainer>
  );
}

export default RTitle;
