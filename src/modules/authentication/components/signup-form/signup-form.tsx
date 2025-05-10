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
import { connector, ContainerProps } from "./signup-form.container";

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
                {intl.formatMessage({ id: "signup/title" })}
              </CardTitle>
              <CardDescription>
                {intl.formatMessage({ id: "signup/description" })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    isLoading={props.is_loading}
                    onClick={props.onGoogleButtonClick}
                    variant="outline"
                    className="w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    {intl.formatMessage({
                      id: "signup/google",
                    })}
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    {intl.formatMessage({ id: "signup/separatorText" })}
                  </span>
                </div>

                <Form {...form}>
                  <form
                    className="grid gap-6"
                    onSubmit={form.handleSubmit(handleSubmit)}
                  >
                    <div className="grid gap-6">
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {intl.formatMessage({
                                  id: "signup/emailLabel",
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
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={props.is_loading}
                      >
                        {intl.formatMessage({ id: "signup/submitButtonText" })}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center text-sm [&_a]:underline [&_a]:underline-offset-4">
                {intl.formatMessage(
                  { id: "signup/alreadyHaveAccountText" },
                  {
                    a: (chunks) => <Link to="/login">{chunks}</Link>,
                  }
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="text-balance text-muted-foreground [&_a]:hover:text-primary text-center text-xs [&_a]:underline [&_a]:underline-offset-4  ">
            {intl.formatMessage(
              { id: "signup/acceptTermsText" },
              {
                terms: (chunks) => <a href="/terms">{chunks}</a>,
                privacy: (chunks) => <a href="/privacy">{chunks}</a>,
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupForm = connector(Wrapper);
