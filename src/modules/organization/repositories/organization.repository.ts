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

  create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  >;

  does_user_already_have_organization(params: {
    user_id: string;
  }): Promise<{ error: true; code: string } | { error: false; body: boolean }>;

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
