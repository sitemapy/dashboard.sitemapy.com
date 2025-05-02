import { RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  actual_usage: state.usage.current_usage,
  total_usage_limit: state.usage.total_usage_limit,
  usage_reset_date: state.usage.usage_reset_date,
});

const mapDispatch = () => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
