function labelFilter(schedules: CalendarSchedule[], labels: FilterResponse[]) {
  if (labels.length === 0) {
    return schedules;
  }

  return schedules.filter((schedule) => {
    if (schedule.label) {
      const label: FilterResponse = {
        category: schedule.category,
        id: schedule.label.label_id,
        color: schedule.label.color,
        title: schedule.label.title,
      }

      return labels.includes(label);
    } else if (schedule.group) {
      const label: FilterResponse = {
        category: schedule.category,
        id: schedule.group.group_id,
        color: schedule.group.color,
        title: schedule.group.title,
      }

      return labels.includes(label);

    }

    return false;
  });
}

export { labelFilter };
