import { Button, Input, Tooltip, TooltipContent, TooltipTrigger } from "@/ui";
import { CopyIcon, EyeIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

type Props = {
  api_key: string;
  onReset: () => void;
};

export const ApiKeyInput: React.FC<Props> = (props) => {
  const intl = useIntl();

  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">API Key</h1>
        <p className="text-muted-foreground text-sm">
          Use this API key to be able to fetch sitemaps from the API.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            name="api-key"
            className="w-full"
            type={showApiKey ? "text" : "password"}
            readOnly
            value={props.api_key}
          />

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApiKey(!showApiKey);
                }}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showApiKey
                ? intl.formatMessage({ id: "api/api-key-input/hide-api-key" })
                : intl.formatMessage({ id: "api/api-key-input/show-api-key" })}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(props.api_key);
                }}
              >
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
              <Button
                variant="destructive"
                onClick={() => {
                  props.onReset();
                }}
              >
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
