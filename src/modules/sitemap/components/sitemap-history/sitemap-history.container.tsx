import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  history: state.sitemap.history,
  is_loading: state.sitemap.history_is_loading,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  onClick: (sitemap_url: string) => {
    dispatch(actions.sitemap.fetch_sitemap({ sitemap_url }));
  },
  onMount: () => {
    dispatch(actions.sitemap.fetch_history());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
