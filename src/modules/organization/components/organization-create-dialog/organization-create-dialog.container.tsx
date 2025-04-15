import { actions } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_loading: state.organization.is_loading,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  create_organization: (name: string) => {
    dispatch(actions.organization.create_organization({ name }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
