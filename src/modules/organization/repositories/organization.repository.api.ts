import { ApiService } from "@/modules/api/services/api.service";
import { LOCAL_STORAGE_KEYS } from "@/modules/local-storage/services/local-storage.service";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { nanoid } from "@reduxjs/toolkit";
import {
  ApiResponses,
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export class OrganizationRepositoryApi implements OrganizationRepository {
  constructor(private apiService: ApiService) {}

  async get_current_selected_organization(): Promise<
    RepositoryResponse<OrganizationEntity | null>
  > {
    const response = await this.get_organizations();

    if (response.error) return { error: true, code: response.code };

    return { error: false, body: response.body[0] };
  }

  async get_organizations(): Promise<RepositoryResponse<OrganizationEntity[]>> {
    const response = await this.apiService.get<
      ApiResponses["GET /organizations"]
    >(`/organizations`);

    if (response.error) return { error: true, code: response.message };

    return { error: false, body: response.body };
  }

  async select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  > {
    const response = await this.get_organizations();

    if (response.error) return { error: true, code: response.code };

    const organization = response.body.find(
      (organization) => organization.id === params.organization_id
    );

    const selected_organization = organization || response.body[0];

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ORGANIZATION_ID_KEY,
      selected_organization.id
    );

    return { error: false, body: selected_organization };
  }

  async create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<RepositoryResponse<OrganizationEntity>> {
    const response = await this.apiService.post<
      ApiResponses["POST /organizations"]
    >(`/organizations`, {
      name: params.name,
    });

    if (response.error) return { error: true, code: response.message };

    return { error: false, body: response.body };
  }

  async get_organization_members(): Promise<
    RepositoryResponse<OrganizationToUserEntity[]>
  > {
    return { error: false, body: [] };
  }

  async add_member(params: {
    organization_id: string;
    user_id: string;
    member_id: string;
    role: OrganizationRole;
  }): Promise<RepositoryResponse<OrganizationToUserEntity>> {
    return {
      error: false,
      body: {
        id: nanoid(),
        organization_id: params.organization_id,
        user_id: params.user_id,
        role: params.role,
        created_at: new Date(),
        updated_at: new Date(),
      },
    };
  }
}
