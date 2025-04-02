export enum NotificationMessageEntity {}

export type NotificationEntity = {
  type: "info" | "success" | "error" | "warning";
  message?: NotificationMessageEntity | string;
  id: number;
  timeout?: number;
  onValidate?: () => void;
};
