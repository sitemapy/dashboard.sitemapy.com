import { connect, ConnectedProps } from "react-redux";

const mapState = () => ({
  actual_usage: 0,
  total_usage_limit: 100,
  usage_reset_date: new Date(),
});

const mapDispatch = () => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
