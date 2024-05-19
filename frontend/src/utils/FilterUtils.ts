function labelFilter(schedules: CalendarSchedule[], labels: FilterResponse[]) {
  if (labels.length === 0) {
    return schedules;
  }

  return schedules.filter((schedule) => {
    if (schedule.label) {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].id === schedule.label.label_id && labels[i].category === 'MEMBER') {
          return true;
        }
      }
    } else if (schedule.group) {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].id === schedule.group.group_id && labels[i].category === 'GROUP') {
          return true;
        }
      }
    }

    return false;
  });
}

export { labelFilter };
