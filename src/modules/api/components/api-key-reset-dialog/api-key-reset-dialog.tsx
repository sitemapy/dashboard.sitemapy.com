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
import { connector, ContainerProps } from "./api-key-reset-dialog.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();

  return (
    <AlertDialog open={props.is_open} onOpenChange={props.on_close}>
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
          <Button variant="outline" onClick={props.on_close}>
            {intl.formatMessage({
              id: "api/api-key-input/reset-api-key-cancel",
            })}
          </Button>
          <Button
            variant="destructive"
            onClick={props.on_reset}
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

export const ApiKeyResetDialog = connector(Wrapper);
