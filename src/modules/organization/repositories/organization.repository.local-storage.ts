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

  async get_organizations(): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity[] }
  > {
    const organizations = this._get_organizations();

    return { error: false, body: organizations };
  }

  async does_user_already_have_organization(params: {
    user_id: string;
  }): Promise<{ error: true; code: string } | { error: false; body: boolean }> {
    const organization_members = this._get_organization_members();
    const user_already_has_organization = organization_members.find(
      (member) => member.user_id === params.user_id
    );

    if (!user_already_has_organization) return { error: false, body: false };

    return { error: false, body: true };
  }

  async create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  > {
    const organization: OrganizationEntity = {
      id: nanoid(),
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
