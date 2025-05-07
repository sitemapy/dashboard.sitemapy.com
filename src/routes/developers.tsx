import { ApiKeyHowToUseResponse } from "@/modules/api/components/api-key-how-to-use-response/api-key-how-to-use-response";
import { ApiKeyHowToUse } from "@/modules/api/components/api-key-how-to-use/api-key-how-to-use";
import { ApiKeyInput } from "@/modules/api/components/api-key-input/api-key-input";
import { ApiKeyResetDialog } from "@/modules/api/components/api-key-reset-dialog/api-key-reset-dialog";
import { ApiLogsTable } from "@/modules/api/components/api-logs-table/api-logs-table";
import { Protected } from "@/modules/authentication/components/protected/protected";
import { GlobalLayout } from "@/modules/global/components/global-layout/global-layout";
import { UsageBar } from "@/modules/usage/components/usage-bar/usage-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs/tabs";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const DevelopersRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <GlobalLayout>
          <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 p-4">
            <ApiKeyInput />

            <UsageBar />

            <ApiKeyResetDialog />

            <Tabs defaultValue="request">
              <TabsList>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>
              <TabsContent value="request">
                <ApiKeyHowToUse />
              </TabsContent>
              <TabsContent value="response">
                <ApiKeyHowToUseResponse />
              </TabsContent>
            </Tabs>

            <ApiLogsTable />
          </div>
        </GlobalLayout>
      </Protected>
    </>
  );
};
