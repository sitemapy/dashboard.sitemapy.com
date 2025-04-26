import { MessageDescriptor } from "@formatjs/intl";
import en from "./i18n/messages/en.json";

export type MessageI18nKeys = keyof typeof en;

declare module "react-intl" {
  interface IntlShape {
    formatMessage: (
      messageDescriptor: MessageDescriptor & { id: MessageI18nKeys },
      values?: Record<string, ((chunks: string) => unknown) | string>
    ) => string;
  }
}
