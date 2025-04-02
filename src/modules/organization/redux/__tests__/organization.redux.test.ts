import { actions } from "@/redux/actions";
import { init } from "@/redux/store";

describe("Feature: Organization", () => {
  it(`
    Given a logged in user
    When the user gets organizations
    Then the organizations should be returned
  `, async () => {
    const { store, dependencies } = init({});

    await dependencies.OrganizationRepository.create_organization({
      name: "Organization 1",
      user_id: "test-id-1",
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    await store.dispatch(actions.organization.get_organizations());

    expect(store.getState().organization.organization_list).toBeTruthy();
    expect(store.getState().organization.organization_list.length).toBe(1);
    expect(store.getState().organization.organization_list[0].name).toBe(
      "Organization 1"
    );
  });

  it(`
    Given a logged out user
    When a user logs in
    Then the organizations should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    await dependencies.OrganizationRepository.create_organization({
      name: "Organization 1",
      user_id: "test-id-1",
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@example.com",
        password: "password123",
      })
    );

    expect(store.getState().organization.organization_list).toBeTruthy();
    expect(store.getState().organization.organization_list.length).toBe(1);
    expect(store.getState().organization.organization_list[0].name).toBe(
      "Organization 1"
    );
  });

  it(`
    Given a logged in user
    When the user gets organization members
    Then the organization members should be returned
  `, async () => {
    const { store, dependencies } = init({});

    await dependencies.OrganizationRepository.create_organization({
      name: "Organization 1",
      user_id: "test-id-1",
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@example.com",
        password: "password123",
      })
    );

    const organization_id =
      store.getState().organization.organization_list[0].id;

    await store.dispatch(
      actions.organization.get_organization_members({
        organization_id: organization_id,
      })
    );

    expect(store.getState().organization.organization_members.length).toBe(1);
    expect(store.getState().organization.organization_members[0].user_id).toBe(
      "test-id-1"
    );
  });

  it(`
    Given an admin user
    When the user creates a new organization
    Then the new organization should be created
    And the new organization should have one member with admin role
  `, async () => {
    const { store } = init({});

    const user = { email: "test@example.com", password: "password123" };

    await store.dispatch(actions.authentication.signup(user));
    await store.dispatch(actions.authentication.login(user));

    await store.dispatch(
      actions.organization.create_organization({
        name: "Organization 1",
      })
    );

    expect(store.getState().organization.organization_list.length).toBe(1);
    expect(store.getState().organization.organization_list[0].name).toBe(
      "Organization 1"
    );

    const organization_id =
      store.getState().organization.organization_list[0].id;

    await store.dispatch(
      actions.organization.get_organization_members({
        organization_id: organization_id,
      })
    );

    expect(store.getState().organization.organization_members.length).toBe(1);
    expect(store.getState().organization.organization_members[0].user_id).toBe(
      user.email
    );
    expect(store.getState().organization.organization_members[0].role).toBe(
      "admin"
    );
  });

  it(`
    Given an admin user
    When the user creates a new organization
    And the user creates a new member
    Then the new organization should have two member
    And the new member should have a member role
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "member@example.com",
        password: "password123",
      })
    );

    store.dispatch(actions.authentication.logout());

    await store.dispatch(
      actions.authentication.signup({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.organization.create_organization({
        name: "Organization 1",
      })
    );

    const organization_id =
      store.getState().organization.organization_list[0].id;

    await store.dispatch(
      actions.organization.add_member({
        organization_id: organization_id,
        member_id: "member@example.com",
        role: "member",
      })
    );

    expect(store.getState().organization.organization_members.length).toBe(2);
    expect(store.getState().organization.organization_members[1].user_id).toBe(
      "member@example.com"
    );
    expect(store.getState().organization.organization_members[1].role).toBe(
      "member"
    );
  });

  it(`
    Given an admin user
    When the user creates a new organization
    And the user creates a new member
    Then the new organization should have two member
    And the new member should have an admin role
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "member@example.com",
        password: "password123",
      })
    );

    store.dispatch(actions.authentication.logout());

    await store.dispatch(
      actions.authentication.signup({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.organization.create_organization({
        name: "Organization 1",
      })
    );

    const organization_id =
      store.getState().organization.organization_list[0].id;

    await store.dispatch(
      actions.organization.add_member({
        organization_id: organization_id,
        member_id: "member@example.com",
        role: "admin",
      })
    );

    expect(store.getState().organization.organization_members.length).toBe(2);
    expect(store.getState().organization.organization_members[1].user_id).toBe(
      "member@example.com"
    );
    expect(store.getState().organization.organization_members[1].role).toBe(
      "admin"
    );
  });

  it(`
    Given a member user
    When the user tries to add a new member
    Then the new member should not be added
    And the user should get an error
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "member_to_add@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.signup({
        email: "member@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.signup({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.organization.create_organization({
        name: "organization",
      })
    );

    const organization_id =
      store.getState().organization.organization_list[0].id;

    await store.dispatch(
      actions.organization.add_member({
        organization_id: organization_id,
        member_id: "member@example.com",
        role: "member",
      })
    );

    await store.dispatch(actions.authentication.logout());

    await store.dispatch(
      actions.authentication.login({
        email: "member@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.organization.add_member({
        organization_id: organization_id,
        member_id: "member_to_add@example.com",
        role: "member",
      })
    );

    await store.dispatch(
      actions.organization.get_organization_members({
        organization_id: organization_id,
      })
    );

    const organization_members =
      store.getState().organization.organization_members;

    expect(organization_members.length).toBe(2);

    const organization_member_role = organization_members.find(
      (member) => member.user_id === "member@example.com"
    );

    expect(organization_member_role?.role).toBe("member");

    const events = store.getState().global_events.history;
    const error_event = events.find((event) => event.type === "error");

    expect(error_event).toBeDefined();
    expect(error_event?.payload.error).toBe("Only admin can add members");
  });

  it(`
    Given a logged in user
    When the user logs out
    Then the organization should be cleared
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "admin@example.com",
        password: "password123",
      })
    );

    await store.dispatch(
      actions.organization.create_organization({
        name: "organization",
      })
    );
    expect(store.getState().organization.organization_list.length).toBe(1);
    expect(store.getState().organization.organization_list[0].name).toBe(
      "organization"
    );

    store.dispatch(actions.global_events.logout());

    expect(store.getState().organization.organization_list.length).toBe(0);
  });
});
