import { Protected } from "@/modules/authentication/components/protected/protected";
import { GlobalLayout } from "@/modules/global-events/components/global-layout/global-layout";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const HomeRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <GlobalLayout>
          <></>
        </GlobalLayout>
      </Protected>
    </>
  );
};
