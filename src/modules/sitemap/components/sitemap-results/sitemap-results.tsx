import { SitemapResponse } from "@sitemapy/interfaces";
import { Skeleton } from "@sitemapy/ui";
import React from "react";
import { SitemapResultsItem } from "../sitemap-results-item/sitemap-results-item";

type Props = {
  isLoading: boolean;
  sitemaps: SitemapResponse[];
};

export const SitemapResults: React.FC<Props> = (props) => {
  return (
    <div className="mx-auto max-w-6xl">
      {props.isLoading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}

      {props.sitemaps && !props.isLoading && (
        <div className="relative grid gap-2">
          {props.sitemaps.map((sitemap, index) => (
            <SitemapResultsItem key={index} {...sitemap} depth={0} />
          ))}
        </div>
      )}
    </div>
  );
};
