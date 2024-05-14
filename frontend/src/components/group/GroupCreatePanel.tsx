import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import getMemberbyEmail from '@/services/member/getMemberbyEmail';

import { InputDefault } from '../common/InputText';
import PopOver from '../common/PopOver';
import ColorCircle from '../common/ColorCircle';
import PalettePanel from '../color/PalettePanel';
import Button from '../common/Button';

import { FindMemberProfileResponse } from '@/@types/Member';
import X from '@/assets/icons/x.svg';
import DefaultImage from '@/assets/icons/user.svg';
import { BgColors, LabelColorsType } from '@/assets/styles/colorThemes';

type GroupCreatePanelProps = {
  states: GroupInfo;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<GroupInfo>>;
};

function GroupCreatePanel({
  states,
  handleChange,
  setStates,
}: GroupCreatePanelProps) {
  const [color, setColor] = useState<LabelColorsType>('labelRed');
  const [selectedMembers, setSelectedMembers] = useState<
    FindMemberProfileResponse[]
  >([]);
  const [searchMember, setSearchMember] = useState<string>('');
  const [searchedMemberList, setSearchMemberList] = useState<
    FindMemberProfileResponse[]
  >([]);

  const handleSearchMemberChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMember(e.target.value);
    if (e.target.value.length >= 2) {
      const response = await getMemberbyEmail(e.target.value, 49);
      setSearchMemberList(response);
    } else {
      setSearchMemberList([]);
    }
  };

  const handleMemberCancle = (member_id: number) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== member_id),
    );
  };

  const renderSearchedMembers = () => {
    return searchedMemberList.map((member) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSelectedMembers((prev) => {
              if (!prev.some((x) => x.id === member.id)) {
                return [...prev, member];
              }
              return prev;
            });
          }}
        >
          <img
            src={
              member.profile_image_url ? member.profile_image_url : DefaultImage
            }
            alt={member.nickname}
            className="w-8 h-8 rounded-full border-2"
          />
          <span>{member.nickname}</span>
        </div>
      );
    });
  };

  const renderSelectedMembers = () => {
    return selectedMembers.map((member) => {
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={
              member.profile_image_url ? member.profile_image_url : DefaultImage
            }
            alt={member.nickname}
            className="w-8 h-8 rounded-full border-2"
          />
          <span>{member.nickname}</span>
          <Button $size="none" onClick={() => handleMemberCancle(member.id)}>
            <img src={X} alt="선택 취소" />
          </Button>
        </div>
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
    <form
      className="w-[580px] h-[60vh] flex flex-col justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="h-[90%] w-full flex flex-col items-start justify-start gap-4">
        <div className="flex gap-4">
          <label htmlFor="groupName">그룹명</label>
          <InputDefault
            id="groupName"
            name="name"
            maxLength={10}
            value={states.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="groupColor">그룹색상</label>
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
        </div>
        <div>
          <span>그룹멤버</span>
          <InputDefault
            value={searchMember}
            onChange={handleSearchMemberChange}
          />
          {renderSearchedMembers()}
          {renderSelectedMembers()}
        </div>
      </div>
    </form>
  );
}

export default GroupCreatePanel;
