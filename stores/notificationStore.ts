import create from "zustand";
import { v4 as uuidV4 } from "uuid";

export type Notification = {
  id: string;
  status: "error" | "info";
  message: string;
  delay?: number;
};

type NotificationState = {
  notifications: Notification[];
  send: (n: Omit<Notification, "id">) => void;
  close: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  send: (n) =>
    set((state) => {
      const { message, status, delay = 3000 } = n;
      const newNotification: Notification = {
        message,
        status,
        delay,
        id: uuidV4(),
      };
      return { notifications: [...state.notifications, newNotification] };
    }),
  close: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
