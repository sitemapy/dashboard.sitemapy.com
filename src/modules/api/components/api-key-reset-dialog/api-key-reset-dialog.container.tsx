import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_resetting: state.api.is_resetting_api_key,
  is_open: state.modal.current === MODAL_KEYS.API_KEY_RESET,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  on_close: () => {
    dispatch(actions.modal.close({ key: MODAL_KEYS.API_KEY_RESET }));
  },
  on_reset: () => {
    dispatch(actions.api.reset_api_key());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
