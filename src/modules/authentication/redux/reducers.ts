import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";
import { UserEntity } from "@sitemapy/interfaces";

export type AuthenticationState = {
  user: UserEntity | null;
  is_loading: boolean;
  error: string | null;
  /**
   * We need to know if we already checked if the user is authenticated
   * If yes, we can redirect the user to the home page or login page
   * If no, the app will wait until the user has been checked
   */
  initialized: boolean;
};

const initialState: AuthenticationState = {
  user: null,
  is_loading: false,
  error: null,
  initialized: false,
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
      state.initialized = true;
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
    .addCase(actions.authentication._set_initialized, (state, action) => {
      state.initialized = action.payload;
    })
    .addCase(actions.global.logout, () => {
      return initialState;
    });
});
