import {
  OrganizationEntity,
  OrganizationToUserEntity,
} from "@sitemapy/interfaces";

export const organizations: OrganizationEntity[] = [
  {
    id: "organization_1",
    name: "Organization 1",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const members: OrganizationToUserEntity[] = [
  {
    id: "member_1",
    organization_id: "organization_1",
    user_id: "admin",
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
