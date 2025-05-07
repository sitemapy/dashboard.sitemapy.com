import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import { GoogleCallbackRoute } from "./authentication/google/callback";
import { DevelopersRoute } from "./developers";
import { HomeRoute } from "./home";
import { LoginRoute } from "./login";
import { SignupRoute } from "./signup";
import { SupabaseRoute } from "./supabase";

export const Routes: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Router>
        <HomeRoute path="/" />
        <LoginRoute path="/login" />
        <SignupRoute path="/signup" />
        <DevelopersRoute path="/developers" />
        <SupabaseRoute path="/supabase" />
        <GoogleCallbackRoute path="/authentication/google/callback" />
      </Router>
    </>
  );
};
