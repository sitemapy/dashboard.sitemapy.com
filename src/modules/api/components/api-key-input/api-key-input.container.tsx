import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  api_key: state.api.api_key?.key || "",
});

const mapDispatch = (dispatch: AppDispatch) => ({
  on_reset: () => {
    dispatch(actions.modal.open({ key: MODAL_KEYS.API_KEY_RESET }));
  },
  on_copy: () => {
    dispatch(actions.api.copy_api_key());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
