function labelFilter(schedules: CalendarSchedule[], labels: LabelResponse[]) {
  if (labels.length === 0) {
    return schedules;
  }
  const labelIds: Array<number | undefined> = labels.map((label) => {
    return label.label_id;
  });
  return schedules.filter((schedule) => {
    return labelIds.includes(schedule.label?.label_id);
  });
}

export { labelFilter };
