import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { nanoid } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export class OrganizationRepositoryLocalStorage
  implements OrganizationRepository
{
  private ORGANIZATION_KEY = "organizations";
  private ORGANIZATION_MEMBERS_KEY = "organization_members";
  private CURRENT_SELECTED_ORGANIZATION_KEY = "current_selected_organization";

  private _get_organizations(): OrganizationEntity[] {
    return JSON.parse(localStorage.getItem(this.ORGANIZATION_KEY) || "[]");
  }

  private _get_organization_members(): OrganizationToUserEntity[] {
    return JSON.parse(
      localStorage.getItem(this.ORGANIZATION_MEMBERS_KEY) || "[]"
    );
  }

  private _set_organizations(organizations: OrganizationEntity[]): void {
    localStorage.setItem(this.ORGANIZATION_KEY, JSON.stringify(organizations));
  }

  private _set_organization_members(
    organization_members: OrganizationToUserEntity[]
  ): void {
    localStorage.setItem(
      this.ORGANIZATION_MEMBERS_KEY,
      JSON.stringify(organization_members)
    );
  }

  private _get_current_selected_organization(): string | null {
    return localStorage.getItem(this.CURRENT_SELECTED_ORGANIZATION_KEY);
  }

  private _set_current_selected_organization(organization_id: string): void {
    localStorage.setItem(
      this.CURRENT_SELECTED_ORGANIZATION_KEY,
      organization_id
    );
  }

  async select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  > {
    this._set_current_selected_organization(params.organization_id);

    const organization = this._get_organizations().find(
      (organization) => organization.id === params.organization_id
    );

    if (!organization) return { error: true, code: "Organization not found" };

    return { error: false, body: organization };
  }

  async get_current_selected_organization(params: {
    user_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationEntity | null }
  > {
    const organization_members = this._get_organization_members();
    const organizations_to_user = organization_members
      .filter((member) => member.user_id === params.user_id)
      .map((member) => member.organization_id);

    const organizations = this._get_organizations().filter((organization) =>
      organizations_to_user.includes(organization.id)
    );

    if (organizations.length === 0)
      return { error: true, code: "User has no organizations" };

    const organization_id = this._get_current_selected_organization();
    const organization = organizations.find(
      (organization) => organization.id === organization_id
    );

    if (organization) return { error: false, body: organization };

    this._set_current_selected_organization(organizations[0].id);

    return { error: false, body: organizations[0] };
  }

  async get_organizations(params: {
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity[] }
  > {
    const user_already_has_organization =
      await this._does_user_already_have_organization({
        user_id: params.user_id,
      });

    if (!user_already_has_organization) {
      await this.create_organization({
        user_id: params.user_id,
        name: "My Personal Organization",
      });
    }

    const organizations = this._get_organizations();

    return { error: false, body: organizations };
  }

  private _does_user_already_have_organization(params: {
    user_id: string;
  }): boolean {
    const organization_members = this._get_organization_members();
    const user_already_has_organization = organization_members.find(
      (member) => member.user_id === params.user_id
    );

    return !!user_already_has_organization;
  }

  async create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  > {
    const organization: OrganizationEntity = {
      id: params.name,
      name: params.name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this._set_organizations([...this._get_organizations(), organization]);
    this._set_organization_members([
      ...this._get_organization_members(),
      {
        id: nanoid(),
        organization_id: organization.id,
        user_id: params.user_id,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    return { error: false, body: organization };
  }

  async get_organization_members(params: {
    organization_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationToUserEntity[] }
  > {
    return {
      error: false,
      body: this._get_organization_members().filter(
        (member) => member.organization_id === params.organization_id
      ),
    };
  }

  async add_member(params: {
    organization_id: string;
    user_id: string;
    member_id: string;
    role: OrganizationRole;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationToUserEntity }
  > {
    const organization = this._get_organizations().find(
      (organization) => organization.id === params.organization_id
    );
    const user_is_admin = this._get_organization_members().find(
      (member) => member.user_id === params.user_id && member.role === "admin"
    );
    const member_already_exists = this._get_organization_members().find(
      (member) => member.user_id === params.member_id
    );

    if (!organization) return { error: true, code: "Organization not found" };

    if (member_already_exists)
      return { error: true, code: "Member already exists" };

    if (!user_is_admin)
      return { error: true, code: "Only admin can add members" };

    const member: OrganizationToUserEntity = {
      id: `${params.organization_id}:${params.member_id}`,
      organization_id: params.organization_id,
      user_id: params.member_id,
      role: params.role,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this._set_organization_members([
      ...this._get_organization_members(),
      member,
    ]);

    return { error: false, body: member };
  }
}
