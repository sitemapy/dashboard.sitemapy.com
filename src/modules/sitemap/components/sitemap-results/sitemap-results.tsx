import React from "react";
import { SitemapResultsItem } from "../sitemap-results-item/sitemap-results-item";
import { connector, ContainerProps } from "./sitemap-results.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="relative grid gap-2">
      {props.sitemaps.map((sitemap) => (
        <SitemapResultsItem key={sitemap.url} {...sitemap} depth={0} />
      ))}
    </div>
  );
};

Wrapper.displayName = "SitemapResults";

export const SitemapResults = connector(Wrapper);
