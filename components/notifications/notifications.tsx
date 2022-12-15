import { useNotificationStore } from "../../stores/notificationStore";
import { Notification } from "./notification";

export function Notifications() {
  const { notifications } = useNotificationStore();

  return (
    <div className="flex flex-col gap-2 absolute inset-x-2 top-2">
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
