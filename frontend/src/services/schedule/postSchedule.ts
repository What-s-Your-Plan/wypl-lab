// import { axiosWithAccessToken } from '@/services/axios';

async function postSchedule(schedule: Schedule & Repeat) {
  const body: any = {
    title: schedule.title,
    category: schedule.category,
  };

  if (schedule.category === 'Group') {
    body.groupId = schedule.groupId;
  } else if (schedule.category === 'Member') {
    if (schedule.label) {
      body.labelId = schedule.label.label_id;
    }
  }

  body.members = schedule.members.map((member) => {
    return {
      memberId: member.member_id,
    };
  });

  schedule.description.length > 0
    ? (body.description = schedule.description)
    : null;

  if (schedule.isAllday === true) {
    body.startDate = new Date(schedule.startDate);
    body.startDate.setHour(0);
    body.startDate.setMinutes(0);
    body.endDate = new Date(schedule.endDate);
    body.endDate.setHour(24);
    body.endDate.setMinutes(0);
  } else if (schedule.isAllday === false) {
    let startHour = schedule.startHour === 12 ? 0 : schedule.startHour;
    let startMinute = schedule.startMinute;
    let endHour = schedule.endHour === 12 ? 0 : schedule.endHour;
    let endMinute = schedule.endMinute;

    schedule.startAMPM === 'PM' ? startHour + 12 : null;
    schedule.endAMPM === 'PM' ? endHour + 12 : null;

    body.startDate = new Date(schedule.startDate);
    body.startDate.setHour(startHour);
    body.startDate.setMinutes(startMinute);
    body.endDate = new Date(schedule.endDate);
    body.endDate.setHour(endHour);
    body.endDate.setMinutes(endMinute);
  }

  if (schedule.isRepetition) {
    body.repetition = {};
    body.repetition.startDate = schedule.startDate;
    switch (schedule.repetitionCycle) {
      case '매일':
        body.repetition.repetitionCycle = 'week';
        body.week = 1;
        body.dayOfWeek = 1111111;
        break;
      case '매 주':
        body.repetition.repetitionCycle = 'week';
        body.week = schedule.week;
        body.dayOfWeek = schedule.dayOfWeek;
        break;
      case '매 달':
        body.repetition.repetitionCycle = 'month';
        break;
      case '매 년':
        body.repetition.repetitionCycle = 'year';
        break;
      default:
        break;
    }
    if (schedule.period === '종료일') {
      body.repetition.endDate = schedule.endRDate;
    }
  }
}

export default postSchedule;
