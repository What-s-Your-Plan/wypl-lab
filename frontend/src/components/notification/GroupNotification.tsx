type GroupNotificationProps = {
  notification: WYPLNotification;
};

function GroupNotification({ notification }: GroupNotificationProps) {
  return <div className="container flex flex-col">{notification.message}</div>;
}

export default GroupNotification;
