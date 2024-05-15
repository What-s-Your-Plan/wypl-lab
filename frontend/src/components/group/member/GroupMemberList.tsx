import { useEffect, useState } from 'react';

import getGroupMember, {
  FindGroupMembersResponse as GroupMembers,
  GroupMemberResponse as GroupMember,
} from '@/services/group/getGroupMember';

import useMemberStore from '@/stores/MemberStore';

import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

import styled from 'styled-components';
import { BgColors } from '@/assets/styles/colorThemes';
import X from '@/assets/icons/x.svg';

import * as S from './GroupMemberList.styled';
import deleteGroupMemberForceOut, {
  DeleteGroupMemberForceOutRequest,
  DeleteGroupMemberForceOutResponse,
} from '@/services/group/deleteGroupMemberForceOut';
import deleteGroupWithdraw from '@/services/group/deleteGroupWithdraw';

type GroupMemberProps = {
  groupId: number;
  color: BgColors;
  isOwner: boolean;
  groupWithdrawEvent: (groupId: number) => void;
};

function GroupMemberList({
  groupId,
  color,
  isOwner,
  groupWithdrawEvent,
}: GroupMemberProps) {
  const { memberId } = useMemberStore();

  const [groupMembers, setGroupMembers] = useState<GroupMembers>({
    color: 'labelBrown',
    member_count: 0,
    members: [],
  });

  const fetchGroupMember = async () => {
    const newGroupMembers: GroupMembers = await getGroupMember(groupId);
    setGroupMembers(newGroupMembers);
  };

  useEffect(() => {
    fetchGroupMember();
  }, []);

  const requestDeleteMember = async (deleteMemberId: number) => {
    const request: DeleteGroupMemberForceOutRequest = {
      member_id: deleteMemberId,
    };
    const response: DeleteGroupMemberForceOutResponse =
      await deleteGroupMemberForceOut(groupId, request);
    setGroupMembers((prev) => {
      const updatedGroupMembers = prev.members.filter(
        (member) => member.id !== response.member_id,
      );
      return {
        ...prev,
        member_count: updatedGroupMembers.length,
        members: updatedGroupMembers,
      };
    });
  };

  const requestWithdraw = async () => {
    await deleteGroupWithdraw(groupId).then(() => {
      groupWithdrawEvent(groupId);
    });
  };

  return (
    <S.Container>
      {groupMembers.members.map((member: GroupMember) => {
        return (
          <S.Wrapper key={groupId + ' ' + member.id}>
            <S.Box>
              <S.ProfileImg
                src={getMemberProfileImageOrDefault(member.profile_image)}
                alt={member.nickname}
              />
              <S.Text>{member.nickname}</S.Text>
            </S.Box>
            <S.Box>
              {isOwner && member.id !== memberId && (
                <ForceOutImg
                  src={X}
                  onClick={() => requestDeleteMember(member.id)}
                />
              )}
              {isOwner === false && member.id === memberId && (
                <ForceOutImg src={X} onClick={() => requestWithdraw()} />
              )}
              <S.Check
                $isAccepted={member.is_accepted}
                $color={color}
              ></S.Check>
            </S.Box>
          </S.Wrapper>
        );
      })}
    </S.Container>
  );
}

const ForceOutImg = styled.img`
  filter: brightness(0) saturate(100%) invert(58%) sepia(92%) saturate(4683%)
    hue-rotate(335deg) brightness(109%) contrast(90%);
  cursor: pointer;
`;

export default GroupMemberList;
