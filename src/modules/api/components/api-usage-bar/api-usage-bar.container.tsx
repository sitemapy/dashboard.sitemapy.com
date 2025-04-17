import { RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  actual_usage: state.api.api_key?.current_usage || 0,
  total_usage_limit: state.api.api_key?.max_usage || 100,
  usage_reset_date: state.api.api_key?.reset_date || new Date(),
});

const mapDispatch = () => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
