import { Button } from "@/ui";
import { Link, RouteComponentProps } from "@reach/router";
import { Loader2 } from "lucide-react";
import { useIntl } from "react-intl";

export const AuthenticationCallbackRoute: React.FC<
  RouteComponentProps
> = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-pink-400" />
          <p className="text-foreground">
            {formatMessage({ id: "global/loading" })}
          </p>
        </div>
        <Link to="/login">
          <Button variant="link">
            {formatMessage({ id: "global/go-to-login" })}
          </Button>
        </Link>
      </div>
    </div>
  );
};
