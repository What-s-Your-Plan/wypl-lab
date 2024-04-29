import { InputDefault, InputTitle, InputTextArea } from '@/components/common/InputText';
import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg'
import DescriptionIcon from '@/assets/icons/textAlignLeft.svg'
import LabelIcon from '@/assets/icons/tag.svg'
import UsersIcon from '@/assets/icons/users.svg'
import AlarmIcon from '@/assets/icons/alarmClock.svg'
import RepeatIcon from '@/assets/icons/repeat.svg'

type Props = {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

function SchedulePanel({}: Props) {
  return (
    <form
      className="w-80 flex justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex">
        <img src={CalendarAddIcon} alt="CalendarAdd" />
        <InputTitle
          type="text"
          name="title"
          placeholder="일정명을 입력하세요"
        />
      </div>
      <div className="flex">
        <img src={ClockIcon} alt="Clock" />
        <InputDefault
          type="text"
          name="time"
          placeholder="시간을 입력하세요"
        />
      </div>
      <div>
        <img src={DescriptionIcon} alt="Description" />
        <InputTextArea
          name="description"
          placeholder="설명을 입력하세요"
        />
      </div>
      <div>
        <img src={LabelIcon} alt="Label" />
        {/* listBox */}
      </div>
      <div>
        <img src={UsersIcon} alt="Users" />
        {/* listBox */}
      </div>
      <div>
        <img src={AlarmIcon} alt="Alarm" />
      </div>
      <div>
        <img src={RepeatIcon} alt="Repeat" />
        {/* listBox */}
      </div>
    </form>
  );
}

export default SchedulePanel;
