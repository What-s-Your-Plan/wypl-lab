import { useRef, useState } from 'react';

import CheckIcon from '@/assets/icons/check.svg';
import XIcon from '@/assets/icons/x.svg';
import patchNickname from '@/services/member/patchNickname';
import useMemberStore from '@/stores/MemberStore';

import * as S from './MemberNickname.styled';
import { UpdateNicknameRequest, UpdateNicknameResponse } from '@/@types/Member';

function MemberNickname() {
  const { nickname, setNickname } = useMemberStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(nickname!);
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const toggleEdit = async () => {
    await setEdit(!edit);
    if (inputRef.current !== null) {
      inputRef.current.focus;
    }
  };
  const resetEdit = () => {
    setName(nickname!);
    setEdit(false);
  };

  const requestUpdateNickname = async () => {
    if (nickname === name || name.length > 12 || name.length === 0) {
      setName(nickname!);
      setEdit(false);
      return;
    }
    const request: UpdateNicknameRequest = {
      nickname: name,
    };
    const response: UpdateNicknameResponse = await patchNickname(request);
    setNickname(response.nickname);
    setEdit(false);
  };

  return (
    <S.Container>
      {edit ? (
        <S.NicknameUpdateWrapper>
          <S.NicknameInput
            value={name}
            onChange={handleNickname}
            maxLength={12}
            ref={inputRef}
          />
          <S.IconBox>
            <S.Icon src={CheckIcon} alt={'o'} onClick={requestUpdateNickname} />
            <S.Icon src={XIcon} alt={'x'} onClick={resetEdit} />
          </S.IconBox>
        </S.NicknameUpdateWrapper>
      ) : (
        <S.Nickname>
          안녕하세요,&nbsp;
          <S.NicknameUpdateBox onClick={toggleEdit}>{name}</S.NicknameUpdateBox>
          님
        </S.Nickname>
      )}
    </S.Container>
  );
}

export default MemberNickname;
