import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
  UserEntity,
} from "@sitemapy/interfaces";

export const get_organizations = createAsyncThunk<
  OrganizationEntity[],
  void,
  AsyncThunkConfig
>("organization/get_organizations", async (_, { extra, getState }) => {
  const { authentication } = getState();
  const user = authentication.user as UserEntity;

  const response = await extra.OrganizationRepository.get_organizations({
    user_id: user.id,
  });

  if (response.error) {
    throw new Error(response.code);
  }

  return response.body;
});

export const get_organization_members = createAsyncThunk<
  OrganizationToUserEntity[],
  { organization_id: string },
  AsyncThunkConfig
>(
  "organization/get_organization_members",
  async (params, { extra, getState }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response =
      await extra.OrganizationRepository.get_organization_members({
        organization_id: params.organization_id,
        user_id: user.id,
      });

    if (response.error) {
      throw new Error(response.code);
    }

    return response.body;
  }
);

export const create_organization = createAsyncThunk<
  OrganizationEntity,
  { name: string },
  AsyncThunkConfig
>(
  "organization/create_organization",
  async (params, { extra, dispatch, getState }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response = await extra.OrganizationRepository.create_organization({
      ...params,
      user_id: user.id,
    });

    if (response.error) {
      throw new Error(response.code);
    }

    await dispatch(get_organizations());

    return response.body;
  }
);

export const create_organization_if_not_exists = createAsyncThunk<
  void,
  void,
  AsyncThunkConfig
>(
  "organization/create_organization_if_not_exists",
  async (params, { extra, dispatch, getState }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response =
      await extra.OrganizationRepository.does_user_already_have_organization({
        user_id: user.id,
      });

    if (response.error) throw new Error(response.code);

    const has_organization = response.body;

    if (has_organization) return;

    dispatch(create_organization({ name: "My Personal Organization" }));
  }
);

export const add_member = createAsyncThunk<
  void,
  { organization_id: string; member_id: string; role: OrganizationRole },
  AsyncThunkConfig
>("organization/add_member", async (params, { extra, getState, dispatch }) => {
  const { authentication } = getState();
  const user = authentication.user as UserEntity;

  const response = await extra.OrganizationRepository.add_member({
    member_id: params.member_id,
    organization_id: params.organization_id,
    role: params.role,
    user_id: user.id,
  });

  if (response.error) {
    console.error(response);
    dispatch(actions.global_events.error({ error: response.code }));
  }

  await dispatch(
    get_organization_members({ organization_id: params.organization_id })
  );
});
