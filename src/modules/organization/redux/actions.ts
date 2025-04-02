import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "../entities/organization.entity";

export const get_organizations = createAsyncThunk<
  OrganizationEntity[],
  void,
  AsyncThunkConfig
>("organization/get_organizations", async (_, { extra }) => {
  const response = await extra.OrganizationRepository.get_organizations();

  if (response.error) {
    throw new Error(response.code);
  }

  return response.body;
});

export const get_organization_members = createAsyncThunk<
  OrganizationToUserEntity[],
  { organization_id: string },
  AsyncThunkConfig
>("organization/get_organization_members", async (params, { extra }) => {
  const response = await extra.OrganizationRepository.get_organization_members(
    params
  );

  if (response.error) {
    throw new Error(response.code);
  }

  return response.body;
});

export const create_organization = createAsyncThunk<
  any,
  { name: string },
  AsyncThunkConfig
>(
  "organization/create_organization",
  async (params, { extra, dispatch, getState }) => {
    const { authentication } = getState();

    if (!authentication.user?.id) {
      throw new Error("User not found");
    }

    const response = await extra.OrganizationRepository.create_organization({
      ...params,
      user_id: authentication.user.id,
    });

    if (response.error) {
      throw new Error(response.code);
    }

    await dispatch(get_organizations());
  }
);

export const add_member = createAsyncThunk<
  any,
  { organization_id: string; member_id: string; role: OrganizationRole },
  AsyncThunkConfig
>("organization/add_member", async (params, { extra, getState, dispatch }) => {
  const { authentication } = getState();

  if (!authentication.user?.id) {
    dispatch(actions.global_events.error({ error: "User not found" }));
    return;
  }

  const response = await extra.OrganizationRepository.add_member({
    ...params,
    user_id: authentication.user.id,
  });

  if (response.error) {
    dispatch(actions.global_events.error({ error: response.code }));
  }

  await dispatch(
    get_organization_members({ organization_id: params.organization_id })
  );
});
