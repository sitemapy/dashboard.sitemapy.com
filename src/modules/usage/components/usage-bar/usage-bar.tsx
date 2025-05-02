import { useIntl } from "react-intl";
import { connector, ContainerProps } from "./usage-bar.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();

  const percentage = (props.actual_usage / props.total_usage_limit) * 100;
  const formattedDate = props.usage_reset_date?.toLocaleDateString();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <div>
          {intl.formatMessage(
            {
              id: "api/api-usage-bar/actual-usage",
            },
            {
              actual_usage: props.actual_usage.toString(),
              total_usage_limit: props.total_usage_limit.toString(),
            }
          )}
        </div>
        <div>
          {intl.formatMessage(
            {
              id: "api/api-usage-bar/quota-resets-on",
            },
            {
              date: formattedDate,
            }
          )}
        </div>
      </div>
      <div className="bg-accent h-2 w-full rounded-full">
        <div
          className="bg-foreground h-full rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

export const UsageBar = connector(Wrapper);
