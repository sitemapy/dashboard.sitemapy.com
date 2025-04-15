import { ClockIcon } from "lucide-react"
import React, { useEffect } from "react"
import { format_url_for_history } from "../../utils/format-url-for-sitemap"
import { connector, ContainerProps } from "./sitemap-history.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  if (props.is_loading) {
    return (
      <div className="flex gap-2 overflow-auto">
        <div className="h-8 w-36 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-8 w-36 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-8 w-36 bg-slate-100 rounded-md animate-pulse" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <div className="flex gap-2 overflow-auto">
        {props.history.map((history) => (
          <div
            key={history.sitemap_url}
            onClick={() => props.onClick(history.sitemap_url)}
            className="px-2 pr-4 flex-shrink-0 h-8 items-center inline-flex gap-1 rounded-md bg-slate-50 text-slate-700 text-xs hover:bg-pink-50 hover:text-pink-500 cursor-pointer"
          >
            <ClockIcon className="w-3 h-3 flex-shrink-0" />
            {format_url_for_history(history.sitemap_url)}
          </div>
        ))}
      </div>
    </div>
  )
}

Wrapper.displayName = "SitemapHistory"

export const SitemapHistory = connector(Wrapper)
