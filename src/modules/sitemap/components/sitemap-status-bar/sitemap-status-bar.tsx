import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui";
import { SitemapResponse } from "@sitemapy/interfaces";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CalendarIcon, ClockIcon, FileIcon, ServerIcon } from "lucide-react";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

dayjs.extend(relativeTime);

type Props = {
  status_code?: number;
  response_time?: number;
  number_total_of_pages?: number;
  updated_at?: Date;
  type: SitemapResponse["type"];
};

const Wrapper: React.FC<Props> = (props) => {
  const status = [
    props.number_total_of_pages !== undefined && props.type !== "page" && (
      <Tooltip>
        <TooltipTrigger>
          <div className={clsx("flex items-center gap-1")}>
            <FileIcon className="h-3 w-3" />
            {props.number_total_of_pages}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <FormattedMessage
            id="sitemap-status-bar/total_pages"
            values={{
              total_pages: props.number_total_of_pages,
            }}
          />
        </TooltipContent>
      </Tooltip>
    ),
    props.response_time && (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {props.response_time}ms
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <FormattedMessage
            id="sitemap-status-bar/response_time"
            values={{
              response_time: props.response_time,
            }}
          />
        </TooltipContent>
      </Tooltip>
    ),
    props.status_code && props.type !== "page" && (
      <Tooltip>
        <TooltipTrigger>
          <div className={clsx(props.status_code !== 200 && "text-red-500")}>
            <div className="flex items-center gap-1">
              <ServerIcon className="h-3 w-3" />
              {props.status_code}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <FormattedMessage
            id="sitemap-status-bar/status_code"
            values={{
              status_code: props.status_code,
            }}
          />
        </TooltipContent>
      </Tooltip>
    ),
    props.updated_at && (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {dayjs(props.updated_at).fromNow()}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <FormattedMessage
            id="sitemap-status-bar/updated_at"
            values={{ updated_at: props.updated_at.toLocaleString() }}
          />
        </TooltipContent>
      </Tooltip>
    ),
  ].filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-xs">
      {status.map((item, index) => (
        <React.Fragment key={index}>
          <div className="text-slate-400">{item}</div>
          {index < status.length - 1 && <div className="text-slate-400">•</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

Wrapper.displayName = "SitemapStatusBar";

export const SitemapStatusBar = memo(Wrapper);
