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
import { connector, ContainerProps } from "./signin-form.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();
  const formSchema = z.object({
    email: z.string().email({
      message: intl.formatMessage({ id: "login/invalidEmailText" }),
    }),
    password: z.string({
      message: intl.formatMessage({ id: "login/invalidPasswordText" }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
                {intl.formatMessage({ id: "login/title" })}
              </CardTitle>
              <CardDescription>
                {intl.formatMessage({ id: "login/description" })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    onClick={props.onGoogleButtonClick}
                    className="w-full"
                    isLoading={props.is_loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    {intl.formatMessage({ id: "login/loginWithGoogleText" })}
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    {intl.formatMessage({ id: "login/separatorText" })}
                  </span>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {intl.formatMessage({ id: "login/emailLabel" })}
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
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel>
                                  {intl.formatMessage({
                                    id: "login/passwordLabel",
                                  })}
                                </FormLabel>
                                <Link
                                  to="/forgot-password"
                                  className="ml-auto text-xs underline-offset-4 hover:underline"
                                >
                                  {intl.formatMessage({
                                    id: "login/forgotPasswordText",
                                  })}
                                </Link>
                              </div>
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
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={props.is_loading}
                      >
                        {intl.formatMessage({ id: "login/loginButtonText" })}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center text-sm [&_a]:underline [&_a]:underline-offset-4">
                {intl.formatMessage(
                  { id: "login/signupText" },
                  {
                    a: (chunks) => <Link to="/signup">{chunks}</Link>,
                  }
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="text-balance text-muted-foreground [&_a]:hover:text-primary text-center text-xs [&_a]:underline [&_a]:underline-offset-4  ">
            {intl.formatMessage(
              { id: "login/acceptTermsText" },
              {
                terms: (chunks) => <Link to="/terms">{chunks}</Link>,
                privacy: (chunks) => <Link to="/privacy">{chunks}</Link>,
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SigninForm = connector(Wrapper);
