import { useEffect, useState } from 'react';

import getMemberGroupList from '@/services/group/getMemberGroupList';

import { Container } from '../common/Container';
import { Divider } from '../common/Divider';
import Button from '../common/Button';
import InvitedGroupInfo from './InvitedGroupInfo';
import GroupInfo from './GroupInfo';
import { Disclosure } from '@headlessui/react';

import Envelope from '@/assets/icons/envelope.svg';
import Users from '@/assets/icons/users.svg';
import Plus from '@/assets/icons/plus.svg';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import GroupCreateModal from './GroupCreate/GroupCreateModal';

function GroupList() {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [invitedGroupList, setInvitedGroupList] = useState<Group[]>([]);
  const [groupCreateInit] = useState<GroupInfo>({
    name: '',
    color: 'labelBrown',
    member_id_list: [],
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGroupCreate = () => {
    console.log('새로운 그룹 생성');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const renderInvitedGroupList = () => {
    if (!invitedGroupList || invitedGroupList?.length === 0) {
      return <div>새로운 초대가 없어요</div>;
    }
    return invitedGroupList?.map((group) => {
      return (
        <InvitedGroupInfo
          key={group.id}
          group={group}
          fetchList={fetchGroupList}
        />
      );
    });
  };

  const renderGroupList = () => {
    if (groupList?.length === 0) {
      return <div>속해있는 그룹이 없어요</div>;
    }
    return groupList?.map((group) => {
      return <GroupInfo key={group.id} group={group} />;
    });
  };

  const fetchGroupList = async () => {
    const response = await getMemberGroupList();
    console.log(response);
    setGroupList(response.groups);
    setInvitedGroupList(response.invited_groups);
  };

  useEffect(() => {
    fetchGroupList();
  }, []);

  useEffect(() => {
    fetchGroupList();
  }, [isModalOpen]);

  return (
    <>
      <Container $width="left" className="flex flex-col gap-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center cursor-default">
                <div className="flex gap-2 cursor-pointer">
                  <img src={Envelope} alt="초대" className="w-4" />
                  <span>초대받은 그룹</span>
                  {invitedGroupList && (
                    <span>(+{invitedGroupList.length})</span>
                  )}
                </div>
                <Button className="!bg-transparent" $size="none">
                  <img
                    src={ChevronDown}
                    alt="펼치기"
                    className={open ? 'rotate-180 transform w-5' : 'w-5'}
                  />
                </Button>
              </Disclosure.Button>
              <Disclosure.Panel>{renderInvitedGroupList()}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Divider />
        <div className="scrollBar flex flex-col gap-2 h-[70%]">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={Users} alt="그룹" className="w-4" />
              <div>나의 그룹</div>
            </div>
            <Button
              className="!bg-transparent"
              $size="none"
              onClick={openModal}
            >
              <img src={Plus} alt="그룹 생성" className="w-5 cursor-pointer" />
            </Button>
          </div>
          {renderGroupList()}
        </div>
      </Container>
      <GroupCreateModal
        isOpen={isModalOpen}
        init={groupCreateInit}
        handleClose={closeModal}
        handleConfirm={handleGroupCreate}
      />
    </>
  );
}

export default GroupList;
