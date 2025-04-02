import { UserEntity } from "@/modules/authentication/entities/authentication.entity";
import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const _signup_success = createAction<{ user: UserEntity }>(
  "authentication/_signup_success"
);

export const _signup_failure = createAction<{ error: string }>(
  "authentication/_signup_failure"
);

export const _set_fetching = createAction<boolean>(
  "authentication/_set_fetching"
);

export const _store_user = createAction<{ user: UserEntity }>(
  "authentication/_store_user"
);

export const _login_failure = createAction<{ error: string }>(
  "authentication/_login_failure"
);

export const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  "authentication/logout",
  async (_, { extra, dispatch }) => {
    dispatch(actions.global_events.logout());
    await extra.AuthenticationRepository.logout();
  }
);

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  AsyncThunkConfig
>("authentication/login_request", async (payload, { extra, dispatch }) => {
  dispatch(_set_fetching(true));

  const response = await extra.AuthenticationRepository.login({
    email: payload.email,
    password: payload.password,
  });

  dispatch(_set_fetching(false));

  if (response.error) {
    dispatch(_login_failure({ error: response.code }));
    return;
  }

  dispatch(_store_user({ user: response.body }));
  dispatch(actions.global_events.login({ user: response.body }));
});

export const signup = createAsyncThunk<
  void,
  { email: string; password: string },
  AsyncThunkConfig
>("authentication/signup", async (payload, { extra, dispatch }) => {
  dispatch(_set_fetching(true));

  const response = await extra.AuthenticationRepository.signup({
    email: payload.email,
    password: payload.password,
  });

  dispatch(_set_fetching(false));

  if (response.error) {
    dispatch(_signup_failure({ error: response.code }));
    return;
  }

  dispatch(_store_user({ user: response.body }));
  dispatch(actions.global_events.login({ user: response.body }));
});

export const is_authenticated = createAsyncThunk<void, void, AsyncThunkConfig>(
  "authentication/is_authenticated",
  async (_, { extra, dispatch }) => {
    const response = await extra.AuthenticationRepository.is_authenticated();

    if (!response) return;

    dispatch(_store_user({ user: response }));
    dispatch(actions.global_events.login({ user: response }));
  }
);
