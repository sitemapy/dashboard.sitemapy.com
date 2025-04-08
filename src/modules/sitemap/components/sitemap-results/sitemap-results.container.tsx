import { RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_loading: state.sitemap.is_loading,
  sitemaps: state.sitemap.sitemap_response,
});

const mapDispatch = () => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
