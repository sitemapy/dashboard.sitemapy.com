import React from "react"
import { SitemapResultsItem } from "../sitemap-results-item/sitemap-results-item"
import { connector, ContainerProps } from "./sitemap-results.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (props.is_loading) {
    return (
      <div className="relative grid gap-2 w-full">
        <div className="h-10 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 w-full bg-slate-100 rounded-md animate-pulse" />
      </div>
    )
  }

  return (
    <div className="relative space-y-2 w-full">
      {props.sitemaps.map((sitemap) => (
        <SitemapResultsItem key={sitemap.url} {...sitemap} depth={0} />
      ))}
    </div>
  )
}

Wrapper.displayName = "SitemapResults"

export const SitemapResults = connector(Wrapper)
