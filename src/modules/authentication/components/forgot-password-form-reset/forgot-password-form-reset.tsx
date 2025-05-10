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
import {
  connector,
  ContainerProps,
} from "./forgot-password-form-reset.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();
  const formSchema = z
    .object({
      email: z.string().email({
        message: intl.formatMessage({ id: "signup/invalidEmailText" }),
      }),
      password: z.string().min(8, {
        message: intl.formatMessage({ id: "signup/invalidPasswordText" }),
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: intl.formatMessage({
        id: "signup/confirmPasswordNotMatchError",
      }),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
                {intl.formatMessage({ id: "forgot-password-reset/title" })}
              </CardTitle>
              <CardDescription>
                {intl.formatMessage({
                  id: "forgot-password-reset/description",
                })}
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
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {intl.formatMessage({
                                id: "signup/passwordLabel",
                              })}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {intl.formatMessage({
                                id: "signup/confirmPasswordLabel",
                              })}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="********"
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
                          id: "forgot-password-reset/forgot-password-button-text",
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
                  { id: "forgot-password-reset/back-to-login-text" },
                  {
                    a: (chunks) => (
                      <div>
                        <Link to="/login">{chunks}</Link>
                      </div>
                    ),
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

export const ForgotPasswordResetForm = connector(Wrapper);
