import { Protected } from "@/modules/authentication/components/protected/protected";
import { RouteComponentProps } from "@reach/router";
import { Button } from "@sitemapy/ui";
import React from "react";

export const HomeRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <Button>Click me</Button>
      </Protected>
    </>
  );
};
