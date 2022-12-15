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
      onClick={() => close(notification.id)}
      className={clsx(
        "px-4 py-2 rounded flex justify-center border",
        notification.status === "info"
          ? "bg-purplePale border-purpleDark text-purpleDark"
          : "bg-redPale border-redDark text-redDark"
      )}
    >
      <span>{notification.message}</span>
    </div>
  );
}
