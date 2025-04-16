type Props = {
  actual_usage: number;
  total_usage_limit: number;
  usage_reset_date: Date;
};

export const ApiUsageBar: React.FC<Props> = (props) => {
  const percentage = (props.actual_usage / props.total_usage_limit) * 100;
  const formattedDate = props.usage_reset_date.toLocaleDateString();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <div>
          {props.actual_usage} / {props.total_usage_limit} requests used
        </div>
        <div>Quota resets on {formattedDate}</div>
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
