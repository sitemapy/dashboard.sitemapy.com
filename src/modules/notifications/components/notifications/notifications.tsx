import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export const Notifications: React.FC = () => {
  const { notifications } = useAppSelector((state) => state.notifications);

  const last_notification = notifications[0];
  const last_notification_id = last_notification?.id;

  useEffect(() => {
    if (last_notification_id) {
      toast[last_notification.type || "success"](last_notification.message, {
        duration: last_notification.timeout || 1000,
        description: last_notification.description,
      });
    }
  }, [last_notification_id]);

  return <Toaster />;
};
