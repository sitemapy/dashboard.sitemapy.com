import { Tooltip, TooltipContent, TooltipTrigger } from "@sitemapy/ui";
import clsx from "clsx";
import { CalendarIcon, ClockIcon, FileIcon, ServerIcon } from "lucide-react";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  status_code?: number;
  response_time?: number;
  number_total_of_pages?: number;
  updated_at?: Date;
};

const Wrapper: React.FC<Props> = (props) => {
  const status = [
    props.number_total_of_pages !== undefined && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={clsx("flex items-center gap-1")}>
            <FileIcon className="h-3 w-3" />
            {props.number_total_of_pages}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <FormattedMessage
            id="sitemap/results/status-bar/number-total-of-pages"
            values={{ total: props.number_total_of_pages }}
          />
        </TooltipContent>
      </Tooltip>
    ),
    props.response_time && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {props.response_time}ms
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div>
            The response time for this sitemap is {props.response_time}ms
          </div>
        </TooltipContent>
      </Tooltip>
    ),
    props.status_code && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={clsx(props.status_code !== 200 && "text-red-500")}>
            <div className="flex items-center gap-1">
              <ServerIcon className="h-3 w-3" />
              {props.status_code}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div>The status code for this sitemap is {props.status_code}</div>
        </TooltipContent>
      </Tooltip>
    ),
    props.updated_at && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {props.updated_at.toLocaleString()}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div>
            The sitemap was last updated at {props.updated_at.toLocaleString()}
          </div>
        </TooltipContent>
      </Tooltip>
    ),
  ].filter(Boolean);

  return (
    <div className="flex items-center space-x-1 text-xs">
      {status.map((item, index) => (
        <React.Fragment key={index}>
          <div className="text-muted-foreground">{item}</div>
          {index < status.length - 1 && (
            <div className="text-muted-foreground">•</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

Wrapper.displayName = "SitemapStatusBar";

export const SitemapStatusBar = memo(Wrapper);
