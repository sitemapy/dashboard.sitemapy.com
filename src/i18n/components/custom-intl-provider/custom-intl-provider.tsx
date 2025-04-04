import { IntlProvider } from "react-intl";
import en from "../../messages/en.json";

type Props = {
  children: React.ReactNode;
};

export const CustomIntlProvider: React.FC<Props> = ({ children }) => {
  return (
    <IntlProvider locale="en" messages={en}>
      {children}
    </IntlProvider>
  );
};
