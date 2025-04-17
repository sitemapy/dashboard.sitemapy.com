import { actions, AppDispatch, RootState } from "@/redux/store";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  logs: state.api.logs,
  total_logs: state.api.total_logs,
  total_pages: state.api.total_pages,
  total_logs_per_page: state.api.total_logs_per_page,
  current_page: state.api.current_page,
  is_loading: state.api.is_loading,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  onFirstPage: () => {
    dispatch(actions.api.change_current_page(1));
  },
  onPreviousPage: () => {
    dispatch(actions.api.go_to_previous_page());
  },
  onNextPage: () => {
    dispatch(actions.api.go_to_next_page());
  },
  onLastPage: () => {
    dispatch(actions.api.go_to_last_page());
  },
  onTotalLogsPerPageChange: (total_logs_per_page: number) => {
    dispatch(actions.api.change_total_logs_per_page(total_logs_per_page));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
