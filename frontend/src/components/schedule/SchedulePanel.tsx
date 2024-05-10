import { Dispatch, SetStateAction } from 'react';
import * as Items from '@/components/schedule/ScheduleItems';

type SchedulePanelProps = {
  states: Schedule & Repeat;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<Schedule & Repeat>>;
};

function SchedulePanel({
  states,
  handleChange,
  setStates,
}: SchedulePanelProps) {
  return (
    <form
      className="w-[580px] flex flex-col justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Items.Title states={states} handleChange={handleChange} />
      <Items.Time
        states={states}
        handleChange={handleChange}
        setStates={setStates}
      />
      <Items.Description states={states} handleChange={handleChange} />
      <Items.Label states={states} setStates={setStates} />
      {states.category === 'Member' ? null : (
        <Items.Users states={states} setStates={setStates} />
      )}
      <Items.Repeat
        states={states}
        setStates={setStates}
        handleChange={handleChange}
      />
    </form>
  );
}

export default SchedulePanel;
