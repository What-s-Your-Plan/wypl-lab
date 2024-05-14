import { Dispatch, SetStateAction, useState } from 'react';
import * as S from './Schedule.styled';
import {
  InputDefault,
  InputTitle,
  InputTextArea,
} from '@/components/common/InputText';
import LabelButton from '@/components/common/LabelButton';
import ListBox from '@/components/common/ListBox';
import Toggle from '@/components/common/Toggle';
import CreateLabel from '@/components/label/CreateLabel';
import useDateStore from '@/stores/DateStore';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import CalendarAddIcon from '@/assets/icons/calendarAdd.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
import DescriptionIcon from '@/assets/icons/textAlignLeft.svg';
import LabelIcon from '@/assets/icons/tag.svg';
import UsersIcon from '@/assets/icons/users.svg';
import RepeatIcon from '@/assets/icons/repeat.svg';
import Plus from '@/assets/icons/plus.svg';
import getLabelList from '@/services/label/getLabelList';

type ChangeProps = {
  states: Schedule & Repeat;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
};

type SetProps = {
  states: Schedule & Repeat;
  setStates: Dispatch<SetStateAction<Schedule & Repeat>>;
};

function Title({ states, handleChange }: ChangeProps) {
  return (
    <S.TitleDiv>
      <img src={CalendarAddIcon} alt="CalendarAdd" />
      <InputTitle
        type="text"
        name="title"
        maxLength={50}
        placeholder="일정명을 입력하세요"
        value={states.title}
        onChange={handleChange}
      />
    </S.TitleDiv>
  );
}

function Time({ states, handleChange, setStates }: ChangeProps & SetProps) {
  const ampm = ['AM', 'PM'];

  // const onInputHour = (e: any) => {
  //   e.target.value = Math.floor(e.target.value);
  //   if (e.target.value < 1) {
  //     e.target.value = 1;
  //   } else if (e.target.value > 12) {
  //     e.target.value = 12;
  //   }
  // };

  // const onInputMinute = (e: any) => {
  //   e.target.value = Math.floor(e.target.value);
  //   if (e.target.value < 0) {
  //     e.target.value = 0;
  //   } else if (e.target.value > 59) {
  //     e.target.value = 59;
  //   }
  // };

  const handleAllday = (value: boolean) => {
    setStates((prev) => {
      return {
        ...prev,
        isAllday: value,
      };
    });
  };

  const handleStartAmPm = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        startAMPM: value,
      };
    });
  };

  const handleEndAmPm = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        endAMPM: value,
      };
    });
  };

  return (
    <S.ItemDiv>
      <img src={ClockIcon} alt="Clock" />
      <S.InputDiv>
        <S.BetweenDiv>
          <span>하루 종일</span>
          <Toggle
            enabled={states.isAllday}
            setEnabled={handleAllday as Dispatch<SetStateAction<boolean>>}
          />
        </S.BetweenDiv>
        <div className="flex items-center w-4/5 justify-around">
          <div className="flex flex-col items-center gap-2">
            <InputDefault
              type="date"
              value={states.startDate}
              name="startDate"
              onChange={handleChange}
            />
            {states.isAllday ? null : (
              <S.TimeContainer>
                <ListBox
                  list={ampm}
                  width="w-16"
                  selected={states.startAMPM}
                  setSelected={
                    handleStartAmPm as Dispatch<SetStateAction<string>>
                  }
                />
                <InputDefault
                  type="number"
                  $width="32px"
                  min="1"
                  max="12"
                  value={states.startHour}
                  name="startHour"
                  // onInput={onInputHour}
                  onChange={handleChange}
                />
                <span>:</span>
                <InputDefault
                  type="number"
                  $width="32px"
                  min="0"
                  max="59"
                  value={states.startMinute}
                  name="startMinute"
                  // onInput={onInputMinute}
                  onChange={handleChange}
                />
              </S.TimeContainer>
            )}
          </div>
          <img src={ArrowRightIcon} alt="arrow-right" />
          <div className="flex flex-col items-center gap-2">
            <InputDefault
              type="date"
              value={states.endDate}
              name="endDate"
              onChange={handleChange}
            />
            {states.isAllday ? null : (
              <S.TimeContainer>
                <ListBox
                  list={ampm}
                  width="w-16"
                  selected={states.endAMPM}
                  setSelected={
                    handleEndAmPm as Dispatch<SetStateAction<string>>
                  }
                />
                <InputDefault
                  type="number"
                  $width="32px"
                  min="1"
                  max="12"
                  value={states.endHour}
                  name="endHour"
                  // onInput={onInputHour}
                  onChange={handleChange}
                />
                <span>:</span>
                <InputDefault
                  type="number"
                  $width="32px"
                  min="0"
                  max="59"
                  value={states.endMinute}
                  name="endMinute"
                  // onInput={onInputMinute}
                  onChange={handleChange}
                />
              </S.TimeContainer>
            )}
          </div>
        </div>
      </S.InputDiv>
    </S.ItemDiv>
  );
}

function Description({ states, handleChange }: ChangeProps) {
  return (
    <S.ItemDiv>
      <img src={DescriptionIcon} alt="Description" />
      <InputTextArea
        className="scrollBar h-32"
        $resize={false}
        name="description"
        placeholder="설명을 입력하세요"
        value={states.description}
        onChange={handleChange}
        maxLength={255}
      />
    </S.ItemDiv>
  );
}

function Label({ states, setStates }: SetProps) {
  const { labels, setLabels } = useDateStore()
  const [color, setColor] = useState<LabelColorsType>('labelRed');
  const [create, setCreate] = useState<boolean>(false);
  const handleLabel = (value: Label) => {
    setStates((prev) => {
      return {
        ...prev,
        label: value,
      };
    });
  };

  return (
    <S.ItemDiv>
      <img src={LabelIcon} alt="Label" />
      <S.InputDiv>
        <ListBox
          width="w-full"
          height="h-[44px]"
          list={[
            null,
            ...labels
          ]}
          selected={states.label}
          setSelected={handleLabel}
          render={(item: Label | null) => {
            return item ? (
              <LabelButton as="div" $bgColor={item.color as LabelColorsType}>
                {item.title}
              </LabelButton>
            ) : (
              <span className="py-3 px-2">없음</span>
            );
          }}
          topList={
            <div className="">
              {create ? (
                <CreateLabel
                  color={color}
                  setColor={setColor}
                  handleKeyDown={async() => {
                    const newLabel = await getLabelList()
                    setLabels(newLabel)
                    setCreate(false);
                  }}
                />
              ) : (
                <div
                  className="w-full h-9 flex justify-center items-center hover:bg-main/20"
                  onClick={() => {
                    setCreate(true);
                  }}
                >
                  <img src={Plus} alt="plus" />
                </div>
              )}
            </div>
          }
        />
      </S.InputDiv>
    </S.ItemDiv>
  );
}

function Users({ states, setStates }: SetProps) {
  // 추후 수정 예정
  const handleSelected = (value: Member) => {
    setStates((prev) => {
      return {
        ...prev,
        members: [...prev.members, value],
      };
    });
  };

  return (
    <S.ItemDiv>
      <img src={UsersIcon} alt="Users" />
      <S.InputDiv>
        <ListBox
          width="w-full"
          list={[
            {
              member_id: 1,
              nickname: 'nick', // 회원 별칭
              oauth_id: 'ssafy@ssafy.com', // 이메일
              profile_image: UsersIcon, // 프로필 이미지 주소
            },
          ]}
          selected={states.members}
          setSelected={handleSelected}
          render={(member: Member | Array<Member>) => {
            if (Array.isArray(member)) {
              return member.map((item) => {
                return (
                  <div className="flex items-center gap-x-2">
                    <img src={item.profile_image} alt="profile" />
                    <span>{item.nickname}</span>
                  </div>
                );
              });
            }
            return (
              <div className="flex gap-x-2 items-center">
                <img src={member.profile_image} alt="profile" />
                <span>{member.nickname}</span>
              </div>
            );
          }}
        />
      </S.InputDiv>
    </S.ItemDiv>
  );
}

function Repeat({ states, handleChange, setStates }: ChangeProps & SetProps) {
  const cycle = ['매일', '매 주', '매 달', '매 년'];
  const period = ['계속 반복', '종료 날짜'];

  const setRepetition = (value: boolean) => {
    setStates((prev) => {
      return {
        ...prev,
        isRepetition: value,
      };
    });
  };

  const setRepeatCycle = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        repetitionCycle: value,
      };
    });
  };

  const setPeriod = (value: string) => {
    setStates((prev) => {
      return {
        ...prev,
        period: value,
      };
    });
  };

  return (
    <S.ItemDiv>
      <img src={RepeatIcon} alt="repeat" />
      <S.InputDiv>
        <S.BetweenDiv>
          <span>반복</span>
          <Toggle
            enabled={states.isRepetition}
            setEnabled={setRepetition as Dispatch<SetStateAction<boolean>>}
          />
        </S.BetweenDiv>
        {states.isRepetition ? (
          <>
            <S.BetweenDiv>
              <span>주기</span>
              <ListBox
                list={cycle}
                selected={states.repetitionCycle}
                setSelected={setRepeatCycle as Dispatch<SetStateAction<string>>}
              />
            </S.BetweenDiv>
            {states.repetitionCycle === '매 주' ? (
              <>
                <div className="flex w-full justify-end items-center gap-1">
                  <InputDefault
                    type="number"
                    name="week"
                    $width="32px"
                    value={states.week}
                    onChange={handleChange}
                  />
                  <span>주 마다</span>
                </div>
                <DateSelect states={states} setStates={setStates} />
              </>
            ) : null}
            <S.BetweenDiv>
              <span>기간</span>
              <ListBox
                list={period}
                selected={states.period}
                setSelected={setPeriod as Dispatch<SetStateAction<string>>}
              />
            </S.BetweenDiv>
            {states.period === '종료 날짜' ? (
              <S.BetweenDiv>
                <span>종료 날짜</span>
                <InputDefault
                  type="date"
                  $width="288px"
                  name="endRDate"
                  value={states.endRDate}
                  onChange={handleChange}
                />
              </S.BetweenDiv>
            ) : null}
          </>
        ) : null}
      </S.InputDiv>
    </S.ItemDiv>
  );
}

function DateSelect({ states, setStates }: SetProps) {
  const checkSelected = (day: number) => {
    return !!(states.dayOfWeek & (1 << day));
  };
  const handleClick = (day: number) => {
    setStates((prev) => {
      return {
        ...prev,
        dayOfWeek: prev.dayOfWeek ^ (1 << day),
      };
    });
  };
  return (
    <div className="flex justify-around w-3/4">
      <S.DayButton
        $isSelected={checkSelected(0)}
        onClick={() => {
          handleClick(0);
        }}
        $sun
      >
        일
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(1)}
        onClick={() => {
          handleClick(1);
        }}
      >
        월
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(2)}
        onClick={() => {
          handleClick(2);
        }}
      >
        화
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(3)}
        onClick={() => {
          handleClick(3);
        }}
      >
        수
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(4)}
        onClick={() => {
          handleClick(4);
        }}
      >
        목
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(5)}
        onClick={() => {
          handleClick(5);
        }}
      >
        금
      </S.DayButton>
      <S.DayButton
        $isSelected={checkSelected(6)}
        onClick={() => {
          handleClick(6);
        }}
        $satur
      >
        토
      </S.DayButton>
    </div>
  );
}

export { Title, Time, Description, Label, Users, Repeat };
