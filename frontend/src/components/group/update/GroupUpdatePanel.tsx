import { useEffect, useState } from 'react';

import getMemberByEmail, {
  FindMemberByEmailResponse,
  FindMemberProfile,
} from '@/services/member/getMemberByEmail';

import { InputDefault } from '../../common/InputText';
import PopOver from '../../common/PopOver';
import ColorCircle from '../../common/ColorCircle';
import PalettePanel from '../../color/PalettePanel';

import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';
import { BgColors } from '@/assets/styles/colorThemes';
import noContent from '@/assets/lottie/noContent.json';

import * as S from '@/components/group/create/GroupCreatePanel.styled';

type GroupUpdatePanelProps = {
  groupUpdateInfo: GroupUpdateInfo;
  groupUpdateInfoEvent: (newName: string, newColor: BgColors) => void;
  inviteMemberIdsEvent: (memberIds: Array<number>) => void;
};

function GroupUpdatePanel({
  groupUpdateInfo,
  groupUpdateInfoEvent,
  inviteMemberIdsEvent,
}: GroupUpdatePanelProps) {
  const [searchMember, setSearchMember] = useState<string>('');
  const [searchedMembers, setSearchMembers] = useState<
    Array<FindMemberProfile>
  >([]);

  const handleSearchMemberChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMember(e.target.value);
    if (e.target.value.length >= 2) {
      const response: FindMemberByEmailResponse = await getMemberByEmail(
        e.target.value,
        49,
      );
      setSearchMembers(response.members);
    } else {
      setSearchMembers([]);
    }
  };

  const [selectedMembers, setSelectedMembers] = useState<
    Array<FindMemberProfile>
  >([]);

  const handleAddMember = async (member: FindMemberProfile) => {
    await setSelectedMembers((prev: Array<FindMemberProfile>) => {
      if (
        !prev.some(
          (memberProfile: FindMemberProfile) => memberProfile.id === member.id,
        )
      ) {
        return [...prev, member];
      }
      return prev;
    });
    await inviteMemberIdsEvent(
      selectedMembers.map((m: FindMemberProfile) => {
        return m.id;
      }),
    );
  };

  const handleMemberCancel = async (memberId: number) => {
    await setSelectedMembers(
      selectedMembers.filter((member) => member.id !== memberId),
    );
    await inviteMemberIdsEvent(
      selectedMembers.map((m: FindMemberProfile) => {
        return m.id;
      }),
    );
  };

  const [color, setColor] = useState<BgColors>(
    groupUpdateInfo.color as BgColors,
  );
  const [name, setName] = useState<string>(groupUpdateInfo.name);

  useEffect(() => {
    groupUpdateInfoEvent(name, color);
  }, [color, name]);

  const renderSearchedMembers = () => {
    return searchedMembers.map((member: FindMemberProfile) => {
      return (
        <S.MemberContainer
          key={'memberSearchContainer' + member.id}
          onClick={() => handleAddMember(member)}
        >
          <S.MemberProfileWrapper $color={color}>
            <S.MemberProfileImg
              src={getMemberProfileImageOrDefault(member.profile_image_url)}
              alt={member.nickname}
            />
            <S.MemberProfileBox>
              <S.MemberProfileSpan>{member.email}</S.MemberProfileSpan>
              <S.MemberProfileSpan>{member.nickname}</S.MemberProfileSpan>
            </S.MemberProfileBox>
          </S.MemberProfileWrapper>
        </S.MemberContainer>
      );
    });
  };

  const renderSelectedMembers = () => {
    return selectedMembers.map((member: FindMemberProfile) => {
      return (
        <S.MemberContainer
          key={'memberSelectContainer' + member.id}
          onClick={() => handleMemberCancel(member.id)}
        >
          <S.SelectMemberProfileWrapper
            $color={groupUpdateInfo.color as BgColors}
          >
            <S.MemberProfileImg
              src={getMemberProfileImageOrDefault(member.profile_image_url)}
              alt={member.nickname}
            />
            <S.MemberProfileBox>
              <S.MemberProfileSpan>{member.email}</S.MemberProfileSpan>
              <S.MemberProfileSpan>{member.nickname}</S.MemberProfileSpan>
            </S.MemberProfileBox>
          </S.SelectMemberProfileWrapper>
        </S.MemberContainer>
      );
    });
  };

  return (
    <S.CreateGroupForm
      className="w-[580px] h-[60vh] flex flex-col justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <S.InputContainer>
        <S.InputWrapper>
          <S.InputLabel htmlFor="groupName">그룹 이름</S.InputLabel>
          <S.InputBox>
            <InputDefault
              id="groupName"
              name="name"
              maxLength={10}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PopOver
              panelPosition="top-8"
              button={
                <ColorCircle
                  as="button"
                  $bgColor={color}
                  $cursor="pointer"
                  className="!rounded-md"
                />
              }
              panel={<PalettePanel setColor={setColor} isRounded={true} />}
            />
          </S.InputBox>
        </S.InputWrapper>
        <S.MemberWrapper>
          <S.InputWrapper>
            <S.InputLabel>그룹 멤버 추가</S.InputLabel>
            <InputDefault
              disabled={selectedMembers.length > 10}
              value={searchMember}
              onChange={handleSearchMemberChange}
              placeholder={'사용자 이메일 검색'}
            />
          </S.InputWrapper>
        </S.MemberWrapper>
      </S.InputContainer>
      {searchMember.length >= 2 && searchedMembers.length === 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>
            "{searchMember}"와 일치하는 사용자가 없습니다.
          </S.InputLabel>
          <S.AnimationBox>
            <S.Animation animationData={noContent} />
          </S.AnimationBox>
        </>
      )}
      {searchedMembers.length !== 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>검색된 사용자</S.InputLabel>
          {renderSearchedMembers()}
        </>
      )}
      {selectedMembers.length !== 0 && (
        <>
          <S.Bar $color={color} />
          <S.InputLabel>추가한 사용자</S.InputLabel>
          {renderSelectedMembers()}
        </>
      )}
    </S.CreateGroupForm>
  );
}

export default GroupUpdatePanel;
