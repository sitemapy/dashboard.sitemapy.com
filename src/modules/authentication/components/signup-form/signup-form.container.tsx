import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_loading: state.authentication.is_loading,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  onSubmit: (values: { email: string; password: string }) => {
    dispatch(
      actions.authentication.signup({
        email: values.email,
        password: values.password,
      })
    );
  },
  onGoogleButtonClick: () => {
    dispatch(actions.authentication.login_with_google());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
