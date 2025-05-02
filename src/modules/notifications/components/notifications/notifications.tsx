import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { toast, Toaster } from "sonner";

export const Notifications: React.FC = () => {
  const intl = useIntl();
  const { notifications } = useAppSelector((state) => state.notifications);

  const last_notification = notifications[0];
  const last_notification_id = last_notification?.id;

  useEffect(() => {
    if (last_notification_id) {
      toast[last_notification.type || "success"](
        intl.formatMessage({ id: last_notification.message || "" }),
        {
          duration: last_notification.timeout || 1000,
          description: last_notification.description
            ? intl.formatMessage({ id: last_notification.description })
            : undefined,
        }
      );
    }
  }, [last_notification_id]);

  return <Toaster position="top-center" />;
};
