import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_loading: state.sitemap.is_loading,
});

const mapDispatch = {
  onSubmit: (sitemap_url: string) =>
    actions.sitemap.fetch_sitemap({ sitemap_url }),
};

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
