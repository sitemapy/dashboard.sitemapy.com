import { RootState } from "@/redux/store";
import { Redirect } from "@reach/router";
import { useSelector } from "react-redux";
export const Protected: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { initialized, is_loading, user } = useSelector(
    (state: RootState) => state.authentication
  );

  if (is_loading || !initialized) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
