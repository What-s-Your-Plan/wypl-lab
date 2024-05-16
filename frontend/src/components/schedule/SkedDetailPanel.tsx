import * as Items from './SkedDetailItems';
import TrashIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/editPaper.svg';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import SkedModify from './SkedModify';

type DetailProps = {
  isModify: boolean;
  setModifyTrue: () => void
  schedule: ScheduleResponse | null;
  states: Schedule & Repeat;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<Schedule & Repeat>>;
};

function SkedDetailPanel({ isModify, setModifyTrue ,schedule, states, handleChange, setStates }: DetailProps) {
  const navigator = useNavigate();

  return (
    <div className="w-[580px] flex flex-col justify-center">
      {schedule &&
        (isModify ? (
          <SkedModify states={states} handleChange={handleChange} setStates={setStates} />
        ) : (
          <>
            <div className="flex flex-row-reverse gap-2">
              <button>
                <img src={TrashIcon} alt="trash" />
              </button>
              <button>
                <img
                  src={EditIcon}
                  alt="edit"
                  onClick={() => {
                    setModifyTrue();
                  }}
                />
              </button>
            </div>
            <Items.Title title={schedule.title} />
            <Items.Time
              startDate={schedule.start_date}
              endDate={schedule.end_date}
            />
            {schedule.description && (
              <Items.Description content={schedule.description} />
            )}
            {schedule.category === 'MEMBER' ? (
              <Items.Label label={schedule.label} />
            ) : (
              <Items.Member member={schedule.members} />
            )}
            {schedule.repetition && (
              <Items.Repeat repeat={schedule.repetition} />
            )}
            <Items.WriteReview
              handleClick={() => {
                navigator(`/review/write/${schedule.schedule_id}`);
              }}
            />
          </>
        ))}
    </div>
  );
}

export default SkedDetailPanel;
