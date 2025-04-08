import { actions, AppDispatch } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = () => ({});

const mapDispatch = (dispatch: AppDispatch) => ({
  onSubmit: (values: { email: string; password: string }) => {
    dispatch(
      actions.authentication.login({
        email: values.email,
        password: values.password,
      })
    );
  },
  onGoogleButtonClick: () => {
    alert("Not implemented");
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
