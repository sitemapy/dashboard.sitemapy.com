import { ForgotPasswordForm } from "@/modules/authentication/components/forgot-password-form/forgot-password-form";
import { RouteComponentProps } from "@reach/router";

export const ForgotPasswordRoute: React.FC<RouteComponentProps> = () => {
  return <ForgotPasswordForm />;
};
