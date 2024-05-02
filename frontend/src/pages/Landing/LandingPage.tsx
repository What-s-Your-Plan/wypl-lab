import SchedulePanel from '@/components/schedule/SchedulePanel';
import useForm, { initialSchedule } from '@/hooks/useForm';
import PostSchedule from '@/services/schedule/PostSchedule';

function LandingPage() {
  const { form, handleChange, setForm } = useForm<Schedule & Repeat>(
    initialSchedule,
    PostSchedule,
  );
  return (
    <>
      <div>LandingPage</div>
      <SchedulePanel
        states={form}
        handleChange={handleChange}
        setStates={setForm}
      />
    </>
  );
}

export default LandingPage;
