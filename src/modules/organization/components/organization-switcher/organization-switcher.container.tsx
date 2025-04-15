import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  active_organization: state.organization.current_organization,
  organizations: state.organization.organization_list,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  select_organization: (organization_id: string) => {
    dispatch(actions.organization.select_organization({ organization_id }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
