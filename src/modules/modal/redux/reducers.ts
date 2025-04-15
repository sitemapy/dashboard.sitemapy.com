import { MODAL_KEYS } from "@/lib/use-modal";
import { actions } from "@/redux/store";
import { createReducer } from "@reduxjs/toolkit";

interface State {
  history: {
    type: "open" | "close";
    key: MODAL_KEYS;
    value: unknown | null;
  }[];
  current: MODAL_KEYS | null;
}

const initialState: State = {
  history: [],
  current: null,
};

export const modal_reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.modal.open.fulfilled, (state, action) => {
    state.history.push({
      type: "open",
      key: action.payload.key,
      value: action.payload.value,
    });

    state.current = action.payload.key;
  });

  builder.addCase(actions.modal.close.fulfilled, (state, action) => {
    state.history.push({
      type: "close",
      key: action.payload.key,
      value: null,
    });

    state.current = null;
  });
});
