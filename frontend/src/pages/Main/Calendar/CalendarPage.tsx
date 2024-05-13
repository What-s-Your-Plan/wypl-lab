import WidgetList from '@/components/widget/WidgetList';
import CalendarContent from '@/components/calendar/CalendarContent';

function CalendarPage() {
  return (
    <div className="container flex items-center justify-around ss:max-sm:block h-dvh">
      <WidgetList />
      <CalendarContent />
    </div>
  );
}

export default CalendarPage;
