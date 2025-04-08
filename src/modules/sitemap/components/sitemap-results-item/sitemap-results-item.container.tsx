import { actions, AppDispatch, RootState } from "@/redux/store";
import { SitemapResponse } from "@sitemapy/interfaces";
import { connect, ConnectedProps } from "react-redux";

const mapState = (
  state: RootState,
  props: SitemapResponse & { depth: number }
) => ({
  ...props,
  is_collapsed: state.sitemap.collapsed_folders.includes(props.url),
});

const mapDispatch = (dispatch: AppDispatch) => ({
  toggle_collapse_folder: (id: string) =>
    dispatch(actions.sitemap._toggle_collapse_folder({ id })),
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
