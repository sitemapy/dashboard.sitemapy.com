import { Protected } from "@/modules/authentication/components/protected/protected";
import { GlobalLayout } from "@/modules/global-events/components/global-layout/global-layout";
import { SitemapHero } from "@/modules/sitemap/components/sitemap-hero/sitemap-hero";
import { SitemapHistory } from "@/modules/sitemap/components/sitemap-history/sitemap-history";
import { SitemapResults } from "@/modules/sitemap/components/sitemap-results/sitemap-results";
import { SitemapSearchInput } from "@/modules/sitemap/components/sitemap-search-input/sitemap-search-input";
import { RouteComponentProps } from "@reach/router";
import React from "react";

export const HomeRoute: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Protected>
        <GlobalLayout>
          <div className="mt-8 flex flex-col gap-4 p-4">
            <SitemapHero />
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
              <SitemapHistory />
              <SitemapSearchInput />
              <SitemapResults />
            </div>
          </div>
        </GlobalLayout>
      </Protected>
    </>
  );
};
