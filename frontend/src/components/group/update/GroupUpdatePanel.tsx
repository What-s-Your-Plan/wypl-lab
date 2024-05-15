import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import getMemberByEmail, {
  FindMemberByEmailResponse,
  FindMemberProfile,
} from '@/services/member/getMemberByEmail';

import { InputDefault } from '../../common/InputText';
import PopOver from '../../common/PopOver';
import ColorCircle from '../../common/ColorCircle';
import PalettePanel from '../../color/PalettePanel';

import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';
import { BgColors, LabelColorsType } from '@/assets/styles/colorThemes';
import noContent from '@/assets/lottie/noContent.json';

import * as S from '@/components/group/create/GroupCreatePanel.styled';

type GroupUpdatePanelProps = {
  states: GroupInfo;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<GroupInfo>>;
  color: BgColors;
  setColor: Dispatch<SetStateAction<LabelColorsType>>;
};

function GroupUpdatePanel({
  states,
  handleChange,
  setStates,
  color,
  setColor,
}: GroupUpdatePanelProps) {
  const [selectedMembers, setSelectedMembers] = useState<FindMemberProfile[]>(
    [],
  );
  const [searchMember, setSearchMember] = useState<string>('');
  const [searchedMemberList, setSearchMemberList] = useState<
    FindMemberProfile[]
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
      setSearchMemberList(response.members);
    } else {
      setSearchMemberList([]);
    }
  };

  const handleMemberCancel = (member_id: number) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== member_id),
    );
  };

  const renderSearchedMembers = () => {
    return searchedMemberList.map((member: FindMemberProfile, idx: number) => {
      return (
        <S.MemberContainer
          key={'memberSearchContainer' + idx}
          onClick={() => {
            setSelectedMembers((prev) => {
              if (!prev.some((x) => x.id === member.id)) {
                return [...prev, member];
              }
              return prev;
            });
          }}
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
    return selectedMembers.map((member) => {
      return (
        <S.MemberContainer onClick={() => handleMemberCancel(member.id)}>
          <S.SelectMemberProfileWrapper $color={color}>
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

  useEffect(() => {
    setStates((prev) => {
      return {
        ...prev,
        color: color,
      };
    });
  }, [color]);

  useEffect(() => {
    const newMemberList = selectedMembers.map((member) => {
      return member.id;
    });
    setStates((prev) => {
      return {
        ...prev,
        member_id_list: newMemberList,
      };
    });
  }, [selectedMembers]);

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
              value={states.name}
              onChange={handleChange}
            />
            <PopOver
              panelPosition="top-8"
              button={
                <ColorCircle
                  as="button"
                  $bgColor={color as BgColors}
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
      {searchMember.length >= 2 && searchedMemberList.length === 0 && (
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
      {searchedMemberList.length !== 0 && (
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
