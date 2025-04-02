import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";
import { UserEntity } from "../entities/authentication.entity";

export type AuthenticationState = {
  user: UserEntity | null;
  is_loading: boolean;
  error: string | null;
};

const initialState: AuthenticationState = {
  user: null,
  is_loading: false,
  error: null,
};

export const authentication_reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.authentication._set_fetching, (state, action) => {
      state.is_loading = action.payload;
    })
    .addCase(actions.authentication._store_user, (state, action) => {
      state.is_loading = false;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(actions.authentication._login_failure, (state, action) => {
      state.is_loading = false;
      state.user = null;
      state.error = action.payload.error;
    })
    .addCase(actions.authentication._signup_success, (state, action) => {
      state.is_loading = false;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(actions.authentication._signup_failure, (state, action) => {
      state.is_loading = false;
      state.user = null;
      state.error = action.payload.error;
    })
    .addCase(actions.global_events.logout, () => {
      return initialState;
    });
});
