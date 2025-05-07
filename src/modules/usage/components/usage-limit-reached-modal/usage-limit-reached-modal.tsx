import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui";
import {
  connector,
  ContainerProps,
} from "./usage-limit-reached-modal.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <Dialog open={props.is_open} onOpenChange={props.on_close}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Usage limit reached</DialogTitle>
          <DialogDescription>
            You have reached your usage limit. Please upgrade to a higher plan
            to continue using the service or wait for the next reset.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade to pro for 2$/month</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UsageLimitReachedModal = connector(Wrapper);
