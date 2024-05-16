import GroupList from '@/components/group/GroupList';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useParams } from 'react-router-dom';

function GroupPage() {
  const { groupId } = useParams();
  console.log(groupId);
  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <GroupList />
      <CalendarContent category='GROUP' groupId={Number(groupId)} />
    </div>
  );
}

export default GroupPage;
