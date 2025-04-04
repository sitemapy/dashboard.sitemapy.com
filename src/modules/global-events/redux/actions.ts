import { UserEntity } from "@/modules/authentication/entities/authentication.entity";
import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const error = createAsyncThunk<
  { error: string },
  { error: string },
  AsyncThunkConfig
>("global_events/error", async (params, { dispatch }) => {
  dispatch(
    actions.notifications.create({
      message: params.error,
      type: "error",
    })
  );

  return params;
});

export const logout = createAction("global_events/logout");

export const app_mounted = createAsyncThunk<void, void, AsyncThunkConfig>(
  "global_events/app_mounted",
  async (_, { dispatch }) => {
    dispatch(actions.authentication.is_authenticated());
  }
);

export const login = createAsyncThunk<
  void,
  { user: UserEntity },
  AsyncThunkConfig
>("global_events/login", async (_, { dispatch }) => {
  dispatch(actions.organization.get_organizations());
  dispatch(actions.sitemap.fetch_history());
});
