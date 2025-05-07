import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";

export type usage_state = {
  current_usage: number;
  total_usage_limit: number;
  usage_reset_date: Date;
  is_loading: boolean;
};

const initial_state: usage_state = {
  current_usage: 0,
  total_usage_limit: 100,
  usage_reset_date: new Date(),
  is_loading: false,
};

export const usage_reducer = createReducer(initial_state, (builder) => {
  builder.addCase(actions.usage._set_is_loading, (state, action) => {
    return {
      ...state,
      is_loading: action.payload,
    };
  });

  builder.addCase(actions.usage._store_usage, (state, action) => {
    return {
      ...state,
      current_usage: action.payload.current_usage,
      total_usage_limit: action.payload.total_usage_limit,
      usage_reset_date: action.payload.usage_reset_date,
    };
  });

  builder.addCase(actions.global.logout, () => {
    return initial_state;
  });
});
