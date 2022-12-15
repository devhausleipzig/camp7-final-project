import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect } from "react";
import {
  useNotificationStore,
  Notification as NotificationType,
} from "../../stores/notificationStore";

type NotificationProps = {
  notification: NotificationType;
};

export function Notification({ notification }: NotificationProps) {
  const { close } = useNotificationStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      close(notification.id);
    }, notification.delay);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={clsx(
        "px-4 py-3 rounded text-white flex justify-between",
        notification.status === "info" ? "bg-purple" : "bg-red-600"
      )}
    >
      <span>{notification.message}</span>
      <button onClick={() => close(notification.id)}>
        <XCircleIcon className="w-6 h-6 text-white/80 hover:text-white transition" />
      </button>
    </div>
  );
}
