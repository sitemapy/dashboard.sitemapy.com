import { actions } from "@/redux/actions";
import { init } from "@/redux/store";

describe("Feature: Authentication", () => {
  it(`
    Given a user is not logged in
    When the user signs up
    Then the user should be created in the database
    And redirect to the login page
  `, async () => {
    const { store, dependencies } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    expect(store.getState().authentication.user).toBeTruthy();
    expect(store.getState().authentication.user?.email).toBe(
      "test@example.com"
    );
    expect(store.getState().authentication.is_loading).toBe(false);
    expect(store.getState().authentication.error).toBeNull();

    expect(dependencies.LocationService.getPathname()).toBe("/login");
  });

  it(`
    Given a user is logged in
    When the user logs out
    Then the user should be logged out
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    store.dispatch(actions.authentication.logout());

    expect(store.getState().authentication.user).toBeNull();
    expect(store.getState().authentication.error).toBeNull();
    expect(store.getState().authentication.is_loading).toBe(false);
    expect(store.getState().authentication.initialized).toBe(false);
  });

  it(`
    Given a user is not logged in
    When the user logs in
    Then the user should be logged in
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "test@example.com",
        password: "password123",
      })
    );

    store.dispatch(actions.authentication.logout());

    await store.dispatch(
      actions.authentication.login({
        email: "test@example.com",
        password: "password123",
      })
    );

    expect(store.getState().authentication.user).toBeTruthy();
    expect(store.getState().authentication.error).toBeNull();
    expect(store.getState().authentication.user?.email).toBe(
      "test@example.com"
    );
    expect(store.getState().authentication.is_loading).toBe(false);
    expect(store.getState().authentication.initialized).toBe(true);
  });

  it(`
    Given a user is not logged in
    When the user is authenticated
    Then the user should be logged in
  `, async () => {
    const { store } = init({});

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

    await store.dispatch(actions.authentication.is_authenticated());

    expect(store.getState().authentication.user).toBeTruthy();
    expect(store.getState().authentication.error).toBeNull();
    expect(store.getState().authentication.user?.email).toBe(
      "test@example.com"
    );
  });

  it(`
    Given a user was logged in
    When the app is mounted
    Then the user should be logged in
  `, async () => {
    const { store, dependencies } = init({});

    await dependencies.AuthenticationRepository.signup({
      email: "test@test.com",
      password: "password123",
    });

    await dependencies.AuthenticationRepository.login({
      email: "test@test.com",
      password: "password123",
    });

    expect(store.getState().authentication.initialized).toBe(false);

    await store.dispatch(actions.global_events.app_mounted());

    expect(store.getState().authentication.user?.email).toBe("test@test.com");
    expect(store.getState().authentication.initialized).toBe(true);
  });
});
