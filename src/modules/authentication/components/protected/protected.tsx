import { RootState } from "@/redux/store";
import { Button } from "@/ui/button/button";
import { Link, Redirect } from "@reach/router";
import { Loader2 } from "lucide-react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export const Protected: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { formatMessage } = useIntl();
  const { initialized, is_loading, user } = useSelector(
    (state: RootState) => state.authentication
  );

  if (is_loading || !initialized) {
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
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
