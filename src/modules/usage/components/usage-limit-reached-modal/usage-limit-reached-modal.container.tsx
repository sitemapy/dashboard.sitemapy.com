import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_open: state.modal.current === MODAL_KEYS.USAGE_LIMIT_REACHED,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  on_close: () => {
    dispatch(actions.modal.close({ key: MODAL_KEYS.USAGE_LIMIT_REACHED }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
