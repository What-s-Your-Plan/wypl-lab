type VScheduleProps = {
  schedule: ScheduleSimpleResponse;
};

function VSchedule({ schedule }: VScheduleProps) {
  console.log(schedule);
  return <div>VSchedule</div>;
}

export default VSchedule;
