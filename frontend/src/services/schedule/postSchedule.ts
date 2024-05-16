import { axiosWithAccessToken } from '@/services/axios';
import { dateTimeToString } from '@/utils/DateUtils';

async function postSchedule(schedule: Schedule & Repeat) {
  const body: any = {
    title: schedule.title,
    category: schedule.category,
  };

  if (schedule.category === 'GROUP') {
    body.group_id = schedule.groupId;
  } else if (schedule.category === 'MEMBER') {
    if (schedule.label) {
      body.label_id = schedule.label.id;
    }
  }

  body.members = schedule.members.map((member) => {
    return {
      member_id: member.member_id,
    };
  });

  schedule.description.length > 0
    ? (body.description = schedule.description)
    : null;

  const startDate = new Date(schedule.startDate);
  const endDate = new Date(schedule.endDate);
  if (schedule.isAllday === true) {
    startDate.setHours(0);
    startDate.setMinutes(0);
    endDate.setHours(23);
    endDate.setMinutes(59);
  } else if (schedule.isAllday === false) {
    let startHour = schedule.startHour === 12 ? 0 : Number(schedule.startHour);
    let startMinute = schedule.startMinute;
    let endHour = schedule.endHour === 12 ? 0 : Number(schedule.endHour);
    let endMinute = schedule.endMinute;

    schedule.startAMPM === 'PM' ? (startHour += 12) : null;
    schedule.endAMPM === 'PM' ? (endHour += 12) : null;

    startDate.setHours(startHour);
    startDate.setMinutes(startMinute);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinute);
  }

  body.start_date = dateTimeToString(startDate);
  body.end_date = dateTimeToString(endDate);

  if (schedule.isRepetition) {
    body.repetition = {};
    body.repetition.repetition_start_date = schedule.startDate;
    switch (schedule.repetitionCycle) {
      case '매일':
        body.repetition.repetition_cycle = 'WEEK';
        body.repetition.week = 1;
        body.repetition.day_of_week = 2 ** 7 - 1;
        break;
      case '매 주':
        body.repetition.repetition_cycle = 'WEEK';
        body.repetition.week = schedule.week;
        body.repetition.day_of_week = schedule.dayOfWeek;
        break;
      case '매 달':
        body.repetition.repetition_cycle = 'MONTH';
        body.repetition.day_of_week = 0;
        break;
      case '매 년':
        body.repetition.repetition_cycle = 'YEAR';
        body.repetition.day_of_week = 0;
        break;
      default:
        break;
    }
    if (schedule.period === '종료 날짜') {
      body.repetition.repetition_end_date = schedule.endRDate;
    }
  }

  try {
    const response = await axiosWithAccessToken.post(
      '/schedule/v1/schedules',
      body,
    );
    if (response.status !== 201) {
      console.log(response.status);
    } else {
      console.log(response);
    }
  } catch (err) {
    throw err;
  }
}

export default postSchedule;
