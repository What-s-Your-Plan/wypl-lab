import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import deleteSchedule from '@/services/schedule/deleteSchedule';
import * as Items from './SkedDetailItems';
import TrashIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/editPaper.svg';
import { useNavigate } from 'react-router-dom';
import SkedModify from './SkedModify';
import Modal from '../common/Modal';
import useMemberStore from '@/stores/MemberStore';
import { Review } from '@/@types/ReviewResponse';
import getRelatedReview from '@/services/schedule/getRelatedReview';

type DetailProps = {
  isModify: boolean;
  setModifyTrue: () => void;
  schedule: ScheduleResponse | null;
  states: Schedule & Repeat;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setStates: Dispatch<SetStateAction<Schedule & Repeat>>;
  handleClose: (() => void) | (() => Promise<void>);
};

function SkedDetailPanel({
  isModify,
  setModifyTrue,
  schedule,
  states,
  handleChange,
  setStates,
  handleClose,
}: DetailProps) {
  const navigator = useNavigate();
  // const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [canModify, setCanModify] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [modificationType, setModificationType] = useState<string>('NOW');
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const { memberId } = useMemberStore();
  // const getSchedule = async () => {
  //   const response = await getScheduleDetail(scheduleId);
  //   if (response) {
  //     setSchedule(response);
  //   }
  // };

  const clickDeleteBtn = async () => {
    if (schedule?.repetition !== null) {
      setDeleteOpen(true);
    } else {
      deleteAllSchedule();
    }
  };

  const deleteAllSchedule = async () => {
    if (schedule) {
      await deleteSchedule(schedule?.schedule_id, modificationType);
      setDeleteOpen(false);
      handleClose();
    }
  };

  // useEffect(() => {
  //   getSchedule();
  // }, []);
  // =======
  // import useMemberStore from '@/stores/MemberStore';
  // import Modal from '../common/Modal';

  // type DetailProps = {
  //   scheduleId: number;
  //   handleClose: (() => void) | (() => Promise<void>);
  // };

  // function SkedDetailPanel({ scheduleId, handleClose}: DetailProps) {
  //   const navigator = useNavigate();
  //   // const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  //   const [canModify, setCanModify] = useState<boolean>(false);
  //   const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  //   const [modificationType, setModificationType] = useState<string>("NOW");
  //   const {memberId} = useMemberStore();
  //   // const getSchedule = async () => {
  //   //   const response = await getScheduleDetail(scheduleId);
  //   //   if (response) {
  //   //     setSchedule(response);
  //   //   }
  //   // };

  //   const clickDeleteBtn = async () => {
  //     if(schedule?.repetition !== null){
  //       setDeleteOpen(true);
  //     }
  //     else{
  //       deleteAllSchedule();
  //     }
  //   }

  //   const deleteAllSchedule = async() => {
  //     await deleteSchedule(scheduleId, modificationType);
  //     setDeleteOpen(false);
  //     handleClose();
  //   }

  //   useEffect(() => {
  //     getSchedule();
  //   }, []);
  // >>>>>>> 1ba8ed3f0062647ae078116d39ed9b5bdb6cf4ba

  const fetchReviewList = async () => {
    if (schedule?.schedule_id) {
      const reviews = await getRelatedReview(schedule?.schedule_id);
      setReviewList([reviews]);
    }
  };

  useEffect(() => {
    //스케줄에 포함된 멤버인지 확인
    schedule?.members.map((member) => {
      if (member.member_id === memberId) {
        setCanModify(true);
        return;
      }
    });
    fetchReviewList();
  }, [schedule]);

  return (
    <div className=" w-[580px] flex flex-col justify-center ">
      {schedule &&
        (isModify ? (
          <SkedModify
            states={states}
            handleChange={handleChange}
            setStates={setStates}
          />
        ) : (
          <>
            {canModify && (
              <div className="flex flex-row-reverse gap-2">
                <button onClick={clickDeleteBtn}>
                  <img src={TrashIcon} alt="trash" />
                </button>
                <button
                  onClick={() => {
                    setModifyTrue();
                  }}
                >
                  <img src={EditIcon} alt="edit" />
                </button>
              </div>
            )}
            {
              <Modal
                isOpen={deleteOpen}
                title=""
                contents={
                  <div>
                    <Items.Title title="반복 일정 삭제"></Items.Title>
                    <div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="NOW"
                          onClick={() => setModificationType('NOW')}
                        ></input>
                        <label htmlFor="NOW">현재 일정</label>
                      </div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="AFTER"
                          onClick={() => setModificationType('AFTER')}
                        ></input>
                        <label htmlFor="AFTER">현재 일정 및 향후 일정</label>
                      </div>
                      <div className="!p-1">
                        <input
                          type="radio"
                          name="modificationType"
                          id="ALL"
                          onClick={() => setModificationType('ALL')}
                        ></input>
                        <label htmlFor="ALL">모든 일정</label>
                      </div>
                    </div>
                  </div>
                }
                confirm={{ content: '삭제', handleConfirm: deleteAllSchedule }}
                handleClose={() => {
                  setDeleteOpen(false);
                }}
              ></Modal>
            }
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
            <Items.ReviewList reviewList={reviewList} />
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

{
  /* <<<<<<< HEAD
      {schedule &&
        (isModify ? (
          <SkedModify states={states} handleChange={handleChange} setStates={setStates} />
        ) : (
          <>
            <div className="flex flex-row-reverse gap-2">
              <button>
                <img src={TrashIcon} alt="trash" />
              </button>
              <button
                onClick={() => {
                  setModifyTrue();
                }}
              >
                <img
                  src={EditIcon}
                  alt="edit"
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
======= */
}
