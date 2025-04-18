import { MessageI18nKeys } from "@/intl";
import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { OrganizationEntity, UserEntity } from "@sitemapy/interfaces";

export const error = createAsyncThunk<
  { error: MessageI18nKeys },
  { error: MessageI18nKeys },
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
  await dispatch(actions.organization.get_organizations());
});

export const organization_selected = createAsyncThunk<
  void,
  { organization: OrganizationEntity },
  AsyncThunkConfig
>("global_events/organization_selected", async (_, { dispatch }) => {
  dispatch(actions.sitemap.fetch_history());
  dispatch(actions.api.fetch_logs());
  dispatch(actions.api.fetch_api_key());
});

export const signup = createAsyncThunk<
  void,
  { user: UserEntity },
  AsyncThunkConfig
>("global_events/signup", async () => {});
