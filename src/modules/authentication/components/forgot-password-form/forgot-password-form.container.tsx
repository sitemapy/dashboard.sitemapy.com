import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_loading: state.authentication.is_loading,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  onSubmit: (values: { email: string }) => {
    dispatch(actions.authentication.forgot_password({ email: values.email }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
