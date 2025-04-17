import { useModal } from "@/lib/use-modal";
import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/ui";
import { Form } from "@/ui/form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import {
  connector,
  ContainerProps,
} from "./organization-create-dialog.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: intl.formatMessage({
        id: "organization/create/input/name/error/length",
      }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.create_organization(values.name);
  };

  const { isOpen, onOpenChange } = useModal(MODAL_KEYS.ORGANIZATION_CREATE);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {intl.formatMessage({ id: "organization/create/title" })}
              </DialogTitle>
              <DialogDescription>
                {intl.formatMessage({ id: "organization/create/description" })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {intl.formatMessage({
                        id: "organization/create/input/name/label",
                      })}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder={intl.formatMessage({
                          id: "organization/create/input/name/placeholder",
                        })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {intl.formatMessage({ id: "organization/create/button" })}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const OrganizationCreateDialog = connector(Wrapper);
