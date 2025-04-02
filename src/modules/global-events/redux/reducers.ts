import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";

export type global_events_state = {
  history: { type: string; payload: any }[];
};

const initial_state: global_events_state = {
  history: [],
};

export const global_events_reducer = createReducer(initial_state, (builder) => {
  builder.addCase(actions.global_events.error.fulfilled, (state, action) => {
    return {
      ...state,
      history: [
        {
          type: "error",
          payload: action.payload,
        },
        ...state.history,
      ].slice(0, 10),
    };
  });

  builder.addCase(actions.global_events.logout, (state) => {
    return {
      ...state,
      history: [
        {
          type: "logout",
          payload: {},
        },
        ...state.history,
      ].slice(0, 10),
    };
  });
});
