import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export type OrganizationState = {
  organization_list: OrganizationEntity[];
  current_organization: OrganizationEntity | null;
  is_loading: boolean;
  organization_members: OrganizationToUserEntity[];
};

const initialState: OrganizationState = {
  organization_list: [],
  current_organization: null,
  is_loading: false,
  organization_members: [],
};

export const organization_reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.organization.get_organizations.pending, (state) => {
    state.is_loading = true;
  });

  builder.addCase(
    actions.organization.get_organizations.fulfilled,
    (state, action) => {
      state.is_loading = false;
      state.organization_list = action.payload;
      if (action.payload.length > 0) {
        state.current_organization = action.payload[0];
      }
    }
  );

  builder.addCase(
    actions.organization.get_organization_members.pending,
    (state) => {
      state.is_loading = true;
    }
  );

  builder.addCase(
    actions.organization.get_organization_members.fulfilled,
    (state, action) => {
      state.is_loading = false;
      state.organization_members = action.payload;
    }
  );

  builder.addCase(actions.global_events.logout, () => ({
    ...initialState,
  }));
});
