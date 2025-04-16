import { ApiKeyHowToUseResponse } from "@/modules/api/components/api-key-how-to-use-response/api-key-how-to-use-response";
import { ApiKeyHowToUse } from "@/modules/api/components/api-key-how-to-use/api-key-how-to-use";
import { ApiKeyInput } from "@/modules/api/components/api-key-input/api-key-input";
import { ApiKeyResetDialog } from "@/modules/api/components/api-key-reset-dialog/api-key-reset-dialog";
import { ApiLogsTable } from "@/modules/api/components/api-logs-table/api-logs-table";
import { ApiUsageBar } from "@/modules/api/components/api-usage-bar/api-usage-bar";
import { Protected } from "@/modules/authentication/components/protected/protected";
import { GlobalLayout } from "@/modules/global-events/components/global-layout/global-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs/tabs";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const DevelopersRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <GlobalLayout>
          <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 p-4">
            <ApiKeyInput
              api_key={"a9675d23-6362-4923-b5c5-8744da81a87e"}
              onReset={() => {}}
            />

            <ApiUsageBar
              actual_usage={100}
              total_usage_limit={1000}
              usage_reset_date={new Date()}
            />

            <ApiKeyResetDialog
              is_open={false}
              onOpenChange={() => {}}
              onReset={() => {}}
              is_resetting={false}
            />

            <Tabs defaultValue="request">
              <TabsList>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>
              <TabsContent value="request">
                <ApiKeyHowToUse
                  api_key={"a9675d23-6362-4923-b5c5-8744da81a87e"}
                />
              </TabsContent>
              <TabsContent value="response">
                <ApiKeyHowToUseResponse />
              </TabsContent>
            </Tabs>

            <ApiLogsTable
              logs={[]}
              totalLogs={0}
              totalLogsPerPage={10}
              currentPage={1}
              totalPages={1}
              onFirstPage={() => {}}
              onPreviousPage={() => {}}
              onNextPage={() => {}}
              onLastPage={() => {}}
              onTotalLogsPerPageChange={() => {}}
            />
          </div>
        </GlobalLayout>
      </Protected>
    </>
  );
};
