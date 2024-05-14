import { WhiteContainer } from '@/components/common/Container';
import { InputTitle } from '@/components/common/InputText';

type RTitleProps = {
  $title: string;
  $setTitle: (title: string) => void;
};

function RTitle({ $title, $setTitle }: RTitleProps) {
  return (
    <WhiteContainer $width="900">
      <InputTitle
        placeholder="제목을 입력해주세요"
        $width="100%"
        value={$title}
        maxLength={30}
        onChange={(e) => {
          $setTitle(e.target.value);
        }}
      />
    </WhiteContainer>
  );
}

export default RTitle;
