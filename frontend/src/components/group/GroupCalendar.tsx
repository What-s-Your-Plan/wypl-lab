import { Container } from '../common/Container';

type GroupCalendarProps = {
  groupId?: number;
};

function GroupCalendar({ groupId }: GroupCalendarProps) {
  return <Container $width="right">GroupCalendar</Container>;
}

export default GroupCalendar;
