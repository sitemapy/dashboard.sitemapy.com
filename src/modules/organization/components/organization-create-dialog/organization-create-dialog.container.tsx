import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  is_open: state.modal.current === MODAL_KEYS.ORGANIZATION_CREATE,
  is_creating: state.organization.is_creating,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  create_organization: (name: string) => {
    dispatch(actions.organization.create_organization({ name }));
  },
  on_close: () => {
    dispatch(actions.modal.close({ key: MODAL_KEYS.ORGANIZATION_CREATE }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
