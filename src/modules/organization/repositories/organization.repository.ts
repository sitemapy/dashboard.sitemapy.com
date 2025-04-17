import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export interface OrganizationRepository {
  get_organizations(params: {
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity[]>>;

  get_current_selected_organization(params: {
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity | null>>;

  create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<RepositoryResponse<OrganizationEntity>>;

  select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity>>;

  get_organization_members(params: {
    organization_id: string;
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationToUserEntity[]>>;

  add_member(params: {
    organization_id: string;
    user_id: string;
    member_id: string;
    role: OrganizationRole;
  }): Promise<RepositoryResponse<OrganizationToUserEntity>>;
}
