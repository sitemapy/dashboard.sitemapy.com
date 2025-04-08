import { SigninForm } from "@/modules/authentication/components/signin-form/signin-form";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const LoginRoute: React.FC<RouteComponentProps> = () => {
  return <SigninForm />;
};
