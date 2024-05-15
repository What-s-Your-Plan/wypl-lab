import { useParams } from 'react-router-dom';

// import GroupCalendar from '@/components/group/GroupCalendar';
import GroupList from '@/components/group/GroupList';

import CalendarContent from '@/components/calendar/CalendarContent';
import NoContentAnimation from '@/components/animation/NoContent';
import { Container } from '@/components/common/Container';

function GroupPage() {
  const { groupId } = useParams();

  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <GroupList />
      {/* <GroupCalendar groupId={Number(groupId)} /> */}
      {groupId ? (
        <CalendarContent />
      ) : (
        <Container $width={'right'}>
          <NoContentAnimation />
        </Container>
      )}
    </div>
  );
}

export default GroupPage;
