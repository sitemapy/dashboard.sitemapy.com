import { actions, AppDispatch, RootState } from "@/redux/store";
import { UserEntity } from "@sitemapy/interfaces";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  user: state.authentication.user as UserEntity,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  on_logout: () => {
    dispatch(actions.authentication.logout());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
