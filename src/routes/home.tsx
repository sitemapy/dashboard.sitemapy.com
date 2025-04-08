import { Protected } from "@/modules/authentication/components/protected/protected";
import { GlobalLayout } from "@/modules/global-events/components/global-layout/global-layout";
import { SitemapInput } from "@/modules/sitemap/components/sitemap-input/sitemap-input";
import { SitemapResults } from "@/modules/sitemap/components/sitemap-results/sitemap-results";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "@/ui";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const HomeRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <GlobalLayout>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 !h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analyze your sitemaps</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="p-4">
            <div className="mb-4">
              <h1 className="text-2xl">Let's analyze your sitemaps</h1>
              <p className="text-muted-foreground max-w-xl">
                Please enter the url of your sitemap or your website to get
                started. We will fetch the sitemap, analyze it and show you the
                results.
              </p>
            </div>
            <SitemapInput />
            <SitemapResults />
          </div>
        </GlobalLayout>
      </Protected>
    </>
  );
};
