import { MessageDescriptor } from "@formatjs/intl";
import en from "./i18n/messages/en.json";

type Keys = keyof typeof en;

declare module "react-intl" {
  interface IntlShape {
    formatMessage: (
      messageDescriptor: MessageDescriptor & { id: Keys },
      values?: Record<string, (chunks: React.ReactNode) => React.ReactNode>
    ) => string;
  }
}
