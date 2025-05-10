import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import { AuthenticationCallbackRoute } from "./authentication/callback";
import { DevelopersRoute } from "./developers";
import { ForgotPasswordRoute } from "./forgot-password";
import { ForgotPasswordCallbackRoute } from "./forgot-password/callback";
import { HomeRoute } from "./home";
import { LoginRoute } from "./login";
import { SignupRoute } from "./signup";

export const Routes: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Router>
        <HomeRoute path="/" />
        <LoginRoute path="/login" />
        <SignupRoute path="/signup" />
        <DevelopersRoute path="/developers" />
        <AuthenticationCallbackRoute path="/authentication/callback" />
        <ForgotPasswordRoute path="/forgot-password" />
        <ForgotPasswordCallbackRoute path="/forgot-password/callback" />
      </Router>
    </>
  );
};
