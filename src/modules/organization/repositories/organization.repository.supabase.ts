import { Database } from "@/database.types";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { nanoid } from "@reduxjs/toolkit";
import {
  OrganizationEntity,
  OrganizationRole,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";
import { SupabaseClient } from "@supabase/supabase-js";

export class OrganizationRepositorySupabase implements OrganizationRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async get_current_selected_organization(params: {
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity | null>> {
    const { data, error } = await this.supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", params.user_id)
      .limit(1);

    if (error) return { error: true, code: error.message };
    if (!data) return { error: false, body: null };
    if (data.length === 0) return { error: false, body: null };

    return this.get_organization_by_id({
      organization_id: data[0].organization_id,
    });
  }

  async get_organization_by_id(params: {
    organization_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity>> {
    const { data, error } = await this.supabase
      .from("organizations")
      .select("*")
      .eq("id", params.organization_id)
      .single();

    if (error) return { error: true, code: error.message };

    return {
      error: false,
      body: {
        ...data,
        created_at: new Date(data.created_at || new Date()),
        updated_at: new Date(data.updated_at || new Date()),
      },
    };
  }

  async get_organizations(params: {
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity[]>> {
    const organization_members = await this.supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", params.user_id);

    if (organization_members.error) {
      return { error: true, code: organization_members.error.message };
    }

    const organization_ids = organization_members.data.map(
      (org) => org.organization_id
    );

    const organizations = await this.supabase
      .from("organizations")
      .select("*")
      .in("id", organization_ids);

    if (organizations.error)
      return { error: true, code: organizations.error.message };

    return {
      error: false,
      body: organizations.data.map((organization) => ({
        ...organization,
        created_at: new Date(organization.created_at || new Date()),
        updated_at: new Date(organization.updated_at || new Date()),
      })),
    };
  }

  async select_organization(params: {
    organization_id: string;
    user_id: string;
  }): Promise<RepositoryResponse<OrganizationEntity>> {
    return this.get_organization_by_id({
      organization_id: params.organization_id,
    });
  }

  async create_organization(params: {
    user_id: string;
    name: string;
  }): Promise<RepositoryResponse<OrganizationEntity>> {
    const organization = {
      name: params.name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const organization_response = await this.supabase
      .from("organizations")
      .insert({
        name: organization.name,
        created_at: organization.created_at.toISOString(),
        updated_at: organization.updated_at.toISOString(),
      })
      .select()
      .single();

    if (organization_response.error)
      return { error: true, code: organization_response.error.message };

    const member = {
      organization_id: organization_response.data.id,
      user_id: params.user_id,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const member_response = await this.supabase
      .from("organization_members")
      .insert({
        organization_id: member.organization_id,
        user_id: member.user_id,
        role: member.role,
        created_at: member.created_at.toISOString(),
        updated_at: member.updated_at.toISOString(),
      });

    if (member_response.error)
      return { error: true, code: member_response.error.message };

    return {
      error: false,
      body: {
        ...organization_response.data,
        created_at: new Date(
          organization_response.data.created_at || new Date()
        ),
        updated_at: new Date(
          organization_response.data.updated_at || new Date()
        ),
      },
    };
  }

  async get_organization_members(params: {
    organization_id: string;
  }): Promise<
    | { error: true; code: string }
    | { error: false; body: OrganizationToUserEntity[] }
  > {
    const organization_members = await this.supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", params.organization_id);

    if (organization_members.error)
      return { error: true, code: organization_members.error.message };

    return {
      error: false,
      body: organization_members.data.map((member) => ({
        ...member,
        created_at: new Date(member.created_at || new Date()),
        updated_at: new Date(member.updated_at || new Date()),
        role: member.role as OrganizationRole,
      })),
    };
  }

  async add_member(params: {
    organization_id: string;
    user_id: string;
    member_id: string;
    role: OrganizationRole;
  }): Promise<RepositoryResponse<OrganizationToUserEntity>> {
    const organization = await this.get_organization_by_id({
      organization_id: params.organization_id,
    });

    if (organization.error) return { error: true, code: organization.code };

    if (!organization.body)
      return { error: true, code: "Organization not found" };

    const organization_members_response = await this.supabase
      .from("organization_members")
      .select("*")
      .eq("user_id", params.user_id)
      .eq("organization_id", params.organization_id)
      .eq("role", "admin")
      .single();

    if (organization_members_response.error)
      return { error: true, code: organization_members_response.error.message };

    if (!organization_members_response.data)
      return { error: true, code: "Only admin can add members" };

    const existing_member_response = await this.supabase
      .from("organization_members")
      .select("*")
      .eq("user_id", params.member_id)
      .eq("organization_id", params.organization_id)
      .single();

    if (existing_member_response.error)
      return { error: true, code: existing_member_response.error.message };

    if (existing_member_response.data)
      return { error: true, code: "Member already exists" };

    const member: OrganizationToUserEntity = {
      id: nanoid(),
      organization_id: params.organization_id,
      user_id: params.member_id,
      role: params.role,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const { error } = await this.supabase.from("organization_members").insert({
      id: member.id,
      organization_id: member.organization_id,
      user_id: member.user_id,
      role: member.role,
      created_at: member.created_at.toISOString(),
      updated_at: member.updated_at.toISOString(),
    });

    if (error) return { error: true, code: error.message };

    return { error: false, body: member };
  }
}
