import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GroupList from '@/components/group/GroupList';
import CalendarContent from '@/components/calendar/CalendarContent';

function GroupPage() {
  const { groupId } = useParams();

  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (groupId !== undefined) {
      setId(Number(groupId));
    } else {
      setId(undefined);
    }
  }, [groupId]);

  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <GroupList />
      <CalendarContent category="GROUP" groupId={id} />
    </div>
  );
}

export default GroupPage;
