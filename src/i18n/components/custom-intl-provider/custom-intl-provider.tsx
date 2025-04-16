import { IntlProvider } from "react-intl";

import de from "../../messages/de.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import it from "../../messages/it.json";
import ja from "../../messages/ja.json";
import ko from "../../messages/ko.json";
import pt from "../../messages/pt.json";
import ru from "../../messages/ru.json";
import tr from "../../messages/tr.json";
import zh from "../../messages/zh.json";

import { LOCAL_STORAGE_KEYS } from "@/modules/local-storage/services/local-storage.service";

type Props = {
  children: React.ReactNode;
};

const get_language = () => {
  try {
    const language = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_KEY);
    return language || "en";
  } catch {
    return "en";
  }
};

const get_messages = () => {
  const language = get_language();

  return { en, fr, es, de, it, ko, pt, ru, tr, ja, zh }[language] || en;
};

export const CustomIntlProvider: React.FC<Props> = ({ children }) => {
  return (
    <IntlProvider locale={get_language()} messages={get_messages()}>
      {children}
    </IntlProvider>
  );
};
