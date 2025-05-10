import { ForgotPasswordResetForm } from "@/modules/authentication/components/forgot-password-form-reset/forgot-password-form-reset";
import { RouteComponentProps } from "@reach/router";

export const ForgotPasswordCallbackRoute: React.FC<
  RouteComponentProps
> = () => {
  return <ForgotPasswordResetForm />;
};
