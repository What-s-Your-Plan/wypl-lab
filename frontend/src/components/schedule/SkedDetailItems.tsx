import * as S from './Schedule.styled';
import LabelButton from '@/components/common/LabelButton';
import { isAllday, padding0, stringToDate } from '@/utils/DateUtils';
import { LabelColorsType } from '@/assets/styles/colorThemes';

import CalendarIcon from '@/assets/icons/calendar.svg';
import DescriptionIcon from '@/assets/icons/textAlignLeft.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
import LabelIcon from '@/assets/icons/tag.svg';
import UsersIcon from '@/assets/icons/users.svg';
import RepeatIcon from '@/assets/icons/repeat.svg';

function Title({ title }: { title: string }) {
  return (
    <S.TitleDiv>
      <img src={CalendarIcon} alt="schedule-detail" />
      <p className="border-b-2 grow h-8 bg-transparent font-bold px-2 text-lg">
        {title}
      </p>
    </S.TitleDiv>
  );
}

function Time({ startDate, endDate }: { startDate: string; endDate: string }) {
  const start = stringToDate(startDate);
  const end = stringToDate(endDate);
  const allday = isAllday(start, end);
  const startAmPm = start.getHours() > 12 ? 'PM' : 'AM';
  const endAmPm = end.getHours() > 12 ? 'PM' : 'AM';
  const startHour = padding0(
    startAmPm === 'AM' ? start.getHours() : start.getHours() - 12,
  );
  const endHour = padding0(
    endAmPm === 'AM' ? end.getHours() : end.getHours() - 12,
  );
  const startMinute = padding0(start.getMinutes());
  const endMinute = padding0(end.getMinutes());

  return (
    <S.ItemDiv>
      <img src={ClockIcon} alt="Time" />
      <S.InputDiv>
        <div className="flex items-center w-4/5 justify-around">
          <div className="flex flex-col items-center gap-2">
            <span>
              {start.getFullYear()}.{start.getMonth() + 1}.{start.getDate()}
            </span>
            {allday ? null : (
              <S.TimeContainer>
                <span>{startAmPm} </span>
                <span>{startHour} : </span>
                <span>{startMinute}</span>
              </S.TimeContainer>
            )}
          </div>
          <img src={ArrowRightIcon} alt="arrow-right" />
          <div className="flex flex-col items-center gap-2">
            <span>
              {end.getFullYear()}.{end.getMonth() + 1}.{end.getDate()}
            </span>
            {allday ? null : (
              <S.TimeContainer>
                <span>{endAmPm} </span>
                <span>{endHour} : </span>
                <span>{endMinute}</span>
              </S.TimeContainer>
            )}
          </div>
        </div>
      </S.InputDiv>
    </S.ItemDiv>
  );
}

function Description({ content }: { content: string }) {
  return (
    <S.ItemDiv>
      <img src={DescriptionIcon} alt="Description" />
      <p className="grow">{content}</p>
    </S.ItemDiv>
  );
}

function Label({ label }: { label: LabelResponse | null }) {
  return (
    <S.ItemDiv>
      <img src={LabelIcon} alt="label" />
      <div className="grow">
        {label ? (
          <LabelButton $bgColor={label.color as LabelColorsType}>
            {label.title}
          </LabelButton>
        ) : (
          <span>없음</span>
        )}
      </div>
    </S.ItemDiv>
  );
}

function Member({ member }: { member: Array<Member> }) {
  const renderMembers = () => {
    return member.map((m) => {
      return (
        <div key={m.member_id}>
          {/* <>이미지 넣을 공간</> */}
          <span>{m.nickname}</span>
        </div>
      );
    });
  };
  return (
    <S.ItemDiv>
      <img src={UsersIcon} alt="group" />
      <div className="flex flex-wrap grow">{renderMembers()}</div>
    </S.ItemDiv>
  );
}

const day = ['일', '월', '화', '수', '목', '금', '토'];

function Repeat({ repeat }: { repeat: RepetitionResponse }) {
  let cycle: string;
  const dayOfWeek: Array<string> = [];
  if (repeat.repetition_cycle === 'YEAR') {
    cycle = '매 년';
  } else if (repeat.repetition_cycle === 'MONTH') {
    cycle = '매 달';
  } else if (repeat.repetition_cycle === 'WEEK') {
    if (repeat.day_of_week === 127) {
      cycle = '매일';
    } else {
      for (let i = 0; i < 7; i++) {
        if (repeat.day_of_week & (1 << i)) {
          dayOfWeek.push(day[i]);
        }
      }
      cycle = '주 마다';
    }
  }

  const endDate = (end: string) => {
    const date = stringToDate(end);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  return (
    <S.ItemDiv>
      <img src={RepeatIcon} alt="repeat" />
      <div className="flex flex-col grow">
        <span>
          {cycle! === '주 마다' && repeat.week}
          {cycle!}
          {cycle! === '주 마다' && `(${dayOfWeek.join(', ')})`}
        </span>
        <span>
          {repeat.repetition_end_date && ` ~ ${endDate(repeat.repetition_end_date)}`}
        </span>
      </div>
    </S.ItemDiv>
  );
}

export { Title, Time, Description, Label, Member, Repeat };
