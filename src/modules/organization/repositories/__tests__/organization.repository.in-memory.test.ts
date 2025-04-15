import { OrganizationRepositoryInMemory } from "../organization.repository.in-memory";

describe("Feature: Organization Repository In Memory", () => {
  it(`
    Given an organization repository
    When a user creates an organization
    Then the organization should be created
    And the user should be added as an admin member
  `, async () => {
    const repository = new OrganizationRepositoryInMemory();

    const response = await repository.create_organization({
      name: "Test Organization",
      user_id: "test-user-id",
    });

    if (response.error) throw new Error(response.code);

    expect(response.body.name).toBe("Test Organization");

    const members = await repository.get_organization_members({
      organization_id: response.body.id,
    });

    if (members.error) {
      throw new Error(members.code);
    }

    expect(members.body.length).toBe(1);
    expect(members.body[0].user_id).toBe("test-user-id");
    expect(members.body[0].role).toBe("admin");
  });

  it(`
    Given organizations exist
    When getting organizations for a user
    Then only organizations where user is a member should be returned
  `, async () => {
    const repository = new OrganizationRepositoryInMemory();

    await repository.create_organization({
      name: "Org 1",
      user_id: "user-1",
    });

    await repository.create_organization({
      name: "Org 2",
      user_id: "user-2",
    });

    const orgs = await repository.get_organizations({
      user_id: "user-1",
    });

    if (orgs.error) throw new Error(orgs.code);

    expect(orgs.body.length).toBe(1);
    expect(orgs.body[0].name).toBe("Org 1");
  });

  it(`
    Given a user with no organizations exist
    When getting organizations for a user
    Then a personal organization should be created
  `, async () => {
    const repository = new OrganizationRepositoryInMemory();

    const orgs = await repository.get_organizations({
      user_id: "user-1",
    });

    if (orgs.error) throw new Error(orgs.code);

    expect(orgs.body.length).toBe(1);
    expect(orgs.body[0].name).toBe("My Personal Organization");

    const members = await repository.get_organization_members({
      organization_id: orgs.body[0].id,
    });

    if (members.error) throw new Error(members.code);

    expect(members.body.length).toBe(1);
    expect(members.body[0].user_id).toBe("user-1");
  });
});
