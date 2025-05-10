import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserEntity } from "@sitemapy/interfaces";

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

export const _set_initialized = createAction<boolean>(
  "authentication/_set_initialized"
);

export const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  "authentication/logout",
  async (_, { extra, dispatch }) => {
    dispatch(actions.global.logout());
    extra.LocationService.navigate("/login");
    await extra.AuthenticationRepository.logout();
  }
);

export const login_with_google = createAsyncThunk<void, void, AsyncThunkConfig>(
  "authentication/login_with_google",
  async (_, { extra, dispatch }) => {
    dispatch(_set_fetching(true));

    const language = extra.NavigatorService.get_language();

    const response = await extra.AuthenticationRepository.login_with_google({
      language: language?.split("-")[0] || "en",
    });

    dispatch(_set_fetching(false));

    if (response.error) {
      dispatch(_login_failure({ error: response.code }));
      dispatch(
        actions.notifications.create({
          message: response.code,
          type: "error",
        })
      );
      return;
    }

    dispatch(_store_user({ user: response.body.user }));
    dispatch(actions.global.login({ user: response.body.user }));
    extra.LocationService.navigate("/");
  }
);

export const forgot_password = createAsyncThunk<
  void,
  { email: string },
  AsyncThunkConfig
>("authentication/forgot_password", async (payload, { extra, dispatch }) => {
  dispatch(_set_fetching(true));

  const origin = extra.LocationService.getOrigin();
  const language = extra.NavigatorService.get_language();

  const response = await extra.AuthenticationRepository.forgot_password({
    email: payload.email,
    callback_url: `${origin}/forgot-password/callback`,
    language: language?.split("-")[0] || "en",
  });

  dispatch(_set_fetching(false));

  if (response.error) {
    dispatch(actions.global.error({ error: response.code }));
    return;
  }

  dispatch(
    actions.notifications.create({
      message: "notifications/forgot-password-sent",
      type: "success",
    })
  );

  extra.LocationService.navigate("/login");
});

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
    dispatch(
      actions.notifications.create({
        message: response.code,
        type: "error",
      })
    );
    return;
  }

  dispatch(_store_user({ user: response.body }));
  await dispatch(actions.global.login({ user: response.body }));

  extra.LocationService.navigate("/");
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
  dispatch(actions.global.signup({ user: response.body }));
  dispatch(
    actions.notifications.create({
      message: "notifications/signup/success",
      type: "success",
    })
  );

  extra.LocationService.navigate("/login");
});

export const is_authenticated = createAsyncThunk<void, void, AsyncThunkConfig>(
  "authentication/is_authenticated",
  async (_, { extra, dispatch }) => {
    const response = await extra.AuthenticationRepository.is_authenticated();

    if (!response) {
      dispatch(actions.authentication._set_initialized(true));
      return;
    }

    dispatch(_store_user({ user: response }));
    dispatch(actions.global.login({ user: response }));
    dispatch(actions.authentication._set_initialized(true));
  }
);

export const reset_password = createAsyncThunk<
  void,
  { email: string; password: string },
  AsyncThunkConfig
>("authentication/reset_password", async (payload, { extra, dispatch }) => {
  const params = extra.LocationService.getParams<{ token: string }>();

  dispatch(_set_fetching(true));

  const response = await extra.AuthenticationRepository.reset_password({
    email: payload.email,
    password: payload.password,
    token: params.token,
  });

  dispatch(_set_fetching(false));

  if (response.error) {
    dispatch(actions.global.error({ error: response.code }));
    return;
  }

  dispatch(
    actions.notifications.create({
      message: "notifications/forgot-password-reset/success",
      type: "success",
    })
  );

  extra.LocationService.navigate("/login");
});
