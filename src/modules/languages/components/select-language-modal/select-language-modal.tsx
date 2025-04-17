import { languages_with_label } from "@/i18n/constants/langs";
import { useModal } from "@/lib/use-modal";
import { LOCAL_STORAGE_KEYS } from "@/modules/local-storage/services/local-storage.service";
import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui";
import React from "react";
import { useIntl } from "react-intl";

export const SelectLanguageModal: React.FC = () => {
  const { isOpen, onOpenChange } = useModal(MODAL_KEYS.CHANGE_LANGUAGE);
  const { formatMessage } = useIntl();

  const handleChangeLanguage = (lang: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE_KEY, lang);
    window.location.href = window.location.pathname;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formatMessage({ id: "select-language-modal/title" })}
          </DialogTitle>
          <DialogDescription>
            {formatMessage({ id: "select-language-modal/description" })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          {languages_with_label.map((lang) => (
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage(lang.id)}
              key={lang.id}
              className="justify-start px-2"
            >
              <img className="size-6 rounded" src={`/flags/${lang.id}.svg`} />
              <div className="">{lang.label}</div>
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {formatMessage({ id: "select-language-modal/close" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
