import { SignupForm } from "@/modules/authentication/components/signup-form/signup-form";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const SignupRoute: React.FC<RouteComponentProps> = () => {
  return <SignupForm />;
};
