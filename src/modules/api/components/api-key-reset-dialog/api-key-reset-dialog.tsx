import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/ui";
import { Loader2 } from "lucide-react";
import { useIntl } from "react-intl";

type Props = {
  is_open: boolean;
  onOpenChange: (is_open: boolean) => void;
  onReset: () => void;
  is_resetting: boolean;
};

export const ApiKeyResetDialog: React.FC<Props> = (props) => {
  const intl = useIntl();

  return (
    <AlertDialog open={props.is_open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {intl.formatMessage({
              id: "api/api-key-input/reset-api-key-title",
            })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {intl.formatMessage({
              id: "api/api-key-input/reset-api-key-description",
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => props.onOpenChange(false)}>
            {intl.formatMessage({
              id: "api/api-key-input/reset-api-key-cancel",
            })}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              props.onReset();
            }}
            disabled={props.is_resetting}
          >
            {props.is_resetting ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                {intl.formatMessage({
                  id: "api/api-key-input/reset-api-key-reset",
                })}
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
