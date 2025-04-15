import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export interface OrganizationRepository {
  get_organizations(params: {
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity[] }
  >;

  get_current_selected_organization(params: {
    user_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationEntity | null }
  >;

  create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  >;

  select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  >;

  get_organization_members(params: {
    organization_id: string;
    user_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationToUserEntity[] }
  >;

  add_member(params: {
    organization_id: string;
    user_id: string;
    member_id: string;
    role: OrganizationRole;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationToUserEntity }
  >;
}
