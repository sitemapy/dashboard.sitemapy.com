import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import { DevelopersRoute } from "./developers";
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
      </Router>
    </>
  );
};
