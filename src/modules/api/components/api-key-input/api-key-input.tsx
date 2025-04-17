import { Button, Input, Tooltip, TooltipContent, TooltipTrigger } from "@/ui";
import { CopyIcon, EyeIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { connector, ContainerProps } from "./api-key-input.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();

  const [show_api_key, set_show_api_key] = useState(false);

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">
          {intl.formatMessage({ id: "api/api-key-input/api-key-title" })}
        </h1>
        <p className="text-muted-foreground text-sm">
          {intl.formatMessage({
            id: "api/api-key-input/api-key-description",
          })}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            name="api-key"
            className="w-full"
            type={show_api_key ? "text" : "password"}
            readOnly
            value={props.api_key}
          />

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                onClick={() => {
                  set_show_api_key(!show_api_key);
                }}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {show_api_key
                ? intl.formatMessage({ id: "api/api-key-input/hide-api-key" })
                : intl.formatMessage({ id: "api/api-key-input/show-api-key" })}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button onClick={props.on_copy}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {intl.formatMessage({
                id: "api/api-key-input/copy-to-clipboard",
              })}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="destructive" onClick={props.on_reset}>
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {intl.formatMessage({ id: "api/api-key-input/reset-api-key" })}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export const ApiKeyInput = connector(Wrapper);
