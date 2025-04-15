import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  isLoading: state.sitemap.is_loading,
  sitemap_url: state.sitemap.sitemap_url,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  onSubmit(url: string) {
    dispatch(actions.sitemap.fetch_sitemap({ sitemap_url: url }));
  },
  onValueChange(url: string) {
    dispatch(actions.sitemap._set_sitemap_url({ sitemap_url: url }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
