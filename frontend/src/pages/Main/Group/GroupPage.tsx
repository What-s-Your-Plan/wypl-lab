import { useParams } from 'react-router-dom';

import GroupList from '@/components/group/GroupList';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useEffect, useState } from 'react';

function GroupPage() {
  const { groupId } = useParams();
  const [id, setId] = useState<number | undefined>(undefined);
  useEffect(() => {
    setId(Number(groupId));
  }, [groupId]);

  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <GroupList />
      <CalendarContent category="GROUP" groupId={id} />
    </div>
  );
}

export default GroupPage;
