import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { nanoid } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export class OrganizationRepositoryInMemory implements OrganizationRepository {
  private organizations: Map<string, OrganizationEntity> = new Map();
  private organization_members: OrganizationToUserEntity[] = [];
  private _current_selected_organization: OrganizationEntity | null = null;

  async get_current_selected_organization(params: {
    user_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationEntity | null }
  > {
    if (this._current_selected_organization) {
      return { error: false, body: this._current_selected_organization };
    }

    const organizations = Array.from(this.organizations.values()).filter(
      (organization) =>
        this.organization_members.find(
          (member) =>
            member.organization_id === organization.id &&
            member.user_id === params.user_id
        )
    );

    return { error: false, body: organizations[0] || null };
  }

  async get_organizations(params: {
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity[] }
  > {
    const does_user_already_have_organization =
      await this._does_user_already_have_organization({
        user_id: params.user_id,
      });

    if (!does_user_already_have_organization) {
      await this.create_organization({
        user_id: params.user_id,
        name: "My Personal Organization",
      });

      return this.get_organizations({ user_id: params.user_id });
    }

    const organization_members = this.organizations.values();
    const organizations = Array.from(organization_members).filter(
      (organization) =>
        this.organization_members.find(
          (member) =>
            member.organization_id === organization.id &&
            member.user_id === params.user_id
        )
    );

    return {
      error: false,
      body: organizations,
    };
  }

  async select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<
    { error: true; code: string } | { error: false; body: OrganizationEntity }
  > {
    const organization = this.organizations.get(params.organization_id);

    if (!organization) return { error: true, code: "Organization not found" };

    this._current_selected_organization = organization;

    return { error: false, body: organization };
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

    this.organizations.set(organization.id, organization);
    this.organization_members.push({
      id: nanoid(),
      organization_id: organization.id,
      user_id: params.user_id,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    });

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
      body: this.organization_members.filter(
        (member) => member.organization_id === params.organization_id
      ),
    };
  }

  async _does_user_already_have_organization(params: {
    user_id: string;
  }): Promise<boolean> {
    const user_already_has_organization = this.organization_members.find(
      (member) => member.user_id === params.user_id
    );

    if (!user_already_has_organization) return false;

    return true;
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
    const organization = this.organizations.get(params.organization_id);
    const user_is_admin = this.organization_members.find(
      (member) => member.user_id === params.user_id && member.role === "admin"
    );
    const member_already_exists = this.organization_members.find(
      (member) =>
        member.user_id === params.member_id &&
        member.organization_id === params.organization_id
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

    this.organization_members.push(member);

    return { error: false, body: member };
  }
}
