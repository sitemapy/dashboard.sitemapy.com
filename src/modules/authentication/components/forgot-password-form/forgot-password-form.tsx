import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/ui";
import { Logo } from "@/ui/logo/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";
import { connector, ContainerProps } from "./forgot-password-form.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();
  const formSchema = z.object({
    email: z.string().email({
      message: intl.formatMessage({ id: "login/invalidEmailText" }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.onSubmit(values);
  };

  return (
    <div className="min-h-svh bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />

        <div className="mx-auto flex w-full max-w-md flex-col gap-6 ">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                {intl.formatMessage({ id: "forgot-password/title" })}
              </CardTitle>
              <CardDescription>
                {intl.formatMessage({ id: "forgot-password/description" })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {intl.formatMessage({
                                id: "forgot-password/email-label",
                              })}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={props.is_loading}
                      >
                        {intl.formatMessage({
                          id: "forgot-password/forgot-password-button-text",
                        })}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center text-sm [&_a]:underline [&_a]:underline-offset-4">
                {intl.formatMessage(
                  { id: "forgot-password/back-to-login-text" },
                  {
                    a: (chunks) => <Link to="/login">{chunks}</Link>,
                  }
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordForm = connector(Wrapper);
