import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
  UserEntity,
} from "@sitemapy/interfaces";

export const _store_current_selected_organization = createAction<{
  organization: OrganizationEntity;
}>("organization/_store_current_selected_organization");

export const fetch_selected_organization = createAsyncThunk<
  void,
  void,
  AsyncThunkConfig
>(
  "organization/select_organization",
  async (_, { extra, dispatch, getState }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response =
      await extra.OrganizationRepository.get_current_selected_organization({
        user_id: user.id,
      });

    if (response.error) {
      dispatch(actions.global.error({ error: response.code }));
      return;
    }

    if (!response.body) {
      dispatch(
        actions.global.error({
          error: "notifications/no-organization-found",
        })
      );
      return;
    }

    dispatch(
      _store_current_selected_organization({
        organization: response.body,
      })
    );

    dispatch(
      actions.global.organization_selected({
        organization: response.body,
      })
    );
  }
);

export const select_organization = createAsyncThunk<
  void,
  { organization_id: string },
  AsyncThunkConfig
>(
  "organization/select_organization",
  async (params, { extra, dispatch, getState }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response = await extra.OrganizationRepository.select_organization({
      organization_id: params.organization_id,
      user_id: user.id,
    });

    if (response.error) {
      dispatch(actions.global.error({ error: response.code }));
      return;
    }

    dispatch(
      _store_current_selected_organization({
        organization: response.body,
      })
    );

    dispatch(
      actions.global.organization_selected({
        organization: response.body,
      })
    );
  }
);

export const _store_organizations = createAction<{
  organizations: OrganizationEntity[];
}>("organization/_store_organizations");

export const get_organizations = createAsyncThunk<void, void, AsyncThunkConfig>(
  "organization/get_organizations",
  async (_, { extra, getState, dispatch }) => {
    const { authentication } = getState();
    const user = authentication.user as UserEntity;

    const response = await extra.OrganizationRepository.get_organizations({
      user_id: user.id,
    });

    if (response.error) {
      dispatch(actions.global.error({ error: response.code }));
      return;
    }

    dispatch(_store_organizations({ organizations: response.body }));
    dispatch(fetch_selected_organization());
  }
);

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

export const _set_is_creating = createAction<{ is_creating: boolean }>(
  "organization/_set_is_creating"
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

    dispatch(_set_is_creating({ is_creating: true }));

    const response = await extra.OrganizationRepository.create_organization({
      ...params,
      user_id: user.id,
    });

    dispatch(_set_is_creating({ is_creating: false }));

    if (response.error) {
      throw new Error(response.code);
    }

    dispatch(actions.modal.close({ key: MODAL_KEYS.ORGANIZATION_CREATE }));

    await dispatch(get_organizations());

    return response.body;
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
    dispatch(actions.global.error({ error: response.code }));
  }

  await dispatch(
    get_organization_members({ organization_id: params.organization_id })
  );
});
