import { ApiKey, Log } from "@/modules/api/repositories/api.repository";
import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";

export type api_state = {
  api_key: ApiKey | null;
  logs: Array<Log>;
  total_logs: number;
  total_pages: number;
  current_page: number;
  total_logs_per_page: number;
  is_loading: boolean;
};

const initial_state: api_state = {
  api_key: null,
  logs: [],
  is_loading: false,
  total_logs: 0,
  total_pages: 0,
  current_page: 1,
  total_logs_per_page: 10,
};

export const api_reducer = createReducer(initial_state, (builder) => {
  builder.addCase(actions.api._store_api_key, (state, action) => {
    return {
      ...state,
      api_key: action.payload,
    };
  });

  builder.addCase(actions.api._set_current_page, (state, action) => {
    return {
      ...state,
      current_page: action.payload,
    };
  });

  builder.addCase(actions.api._set_is_loading, (state, action) => {
    return {
      ...state,
      is_loading: action.payload,
    };
  });

  builder.addCase(actions.api._set_total_logs_per_page, (state, action) => {
    return {
      ...state,
      current_page: 1,
      total_logs_per_page: action.payload,
    };
  });

  builder.addCase(actions.api._store_logs, (state, action) => {
    return {
      ...state,
      logs: action.payload.logs,
      total_logs: action.payload.total_logs,
      total_pages: action.payload.total_pages,
    };
  });

  builder.addCase(actions.global_events.logout, () => {
    return initial_state;
  });
});
