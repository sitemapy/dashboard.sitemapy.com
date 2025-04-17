import { MessageI18nKeys } from "@/intl";

export type NotificationEntity = {
  type: "info" | "success" | "error" | "warning";
  message: MessageI18nKeys;
  description?: MessageI18nKeys;
  timeout?: number;
  id: number;
  onValidate?: () => void;
};
