function labelFilter(schedules: CalendarSchedule[], labels: number[]) {
  if (labels.length === 0) {
    return schedules;
  }
  return schedules.filter((schedule) => {
    return labels.includes(schedule.label?.label_id as number);
  });
}

export { labelFilter };
