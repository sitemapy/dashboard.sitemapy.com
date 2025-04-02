export type OrganizationEntity = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type OrganizationRole = "admin" | "member";

export type OrganizationToUserEntity = {
  id: string;
  organization_id: string;
  user_id: string;
  role: OrganizationRole;
  created_at: Date;
  updated_at: Date;
};
