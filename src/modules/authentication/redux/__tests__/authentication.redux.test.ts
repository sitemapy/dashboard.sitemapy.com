import { actions } from "@/redux/actions";
import { init } from "@/redux/store";
import { ErrorEntity } from "@sitemapy/interfaces";
import { AuthenticationRepositoryInMemory } from "../../repositories/authentication.repository.in-memory";

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

    await store.dispatch(actions.global.app_mounted());

    expect(store.getState().authentication.user?.email).toBe("test@test.com");
    expect(store.getState().authentication.initialized).toBe(true);
  });

  it(`
    Given a user is not logged in
    When the user send forgot password request
    Then the user should be redirected to the login page
    And the forgot password request should be sent to the server
  `, async () => {
    const { store, dependencies } = init({});

    await store.dispatch(
      actions.authentication.forgot_password({
        email: "test@example.com",
      })
    );

    const AuthenticationRepository =
      dependencies.AuthenticationRepository as AuthenticationRepositoryInMemory;

    expect(dependencies.LocationService.getPathname()).toBe("/login");

    expect(
      AuthenticationRepository._get_forgot_password_requests
    ).toMatchObject([
      {
        email: "test@example.com",
        callback_url: "http://local.dev/forgot-password/callback",
        token: expect.any(String),
      },
    ]);
  });

  it(`
    Given a user already has a forgot password request
    When the user reset password
    Then the user should be redirected to the login page
    And the password should be reset
  `, async () => {
    const { store, dependencies } = init({});

    const email = "test@example.com";

    await store.dispatch(
      actions.authentication.forgot_password({
        email,
      })
    );

    const AuthenticationRepository =
      dependencies.AuthenticationRepository as AuthenticationRepositoryInMemory;

    const token =
      AuthenticationRepository._get_forgot_password_requests[0].token;

    dependencies.LocationService.navigate(
      `/forgot-password/callback?token=${token}`
    );

    expect(dependencies.LocationService.getUrl()).toBe(
      `http://local.dev/forgot-password/callback?token=${token}`
    );

    await store.dispatch(
      actions.authentication.reset_password({
        email,
        password: "password123",
      })
    );

    expect(store.getState().authentication.user).toBeNull();
    expect(dependencies.LocationService.getPathname()).toBe("/login");
  });

  it(`
    Given a user already has a forgot password request
    When the user reset password with an invalid token
    Then the user should show an error notification
    And the password should not be reset
  `, async () => {
    const { store, dependencies } = init({});

    const email = "test@example.com";

    await store.dispatch(
      actions.authentication.forgot_password({
        email,
      })
    );

    dependencies.LocationService.navigate(
      `/forgot-password/callback?token=bad-token`
    );

    await store.dispatch(
      actions.authentication.reset_password({
        email,
        password: "password123",
      })
    );

    expect(dependencies.LocationService.getPathname()).toBe(
      "/forgot-password/callback"
    );

    const search_for_error = store
      .getState()
      .notifications.notifications.find(
        (notification) => notification.type === "error"
      );

    expect(search_for_error).toBeDefined();
    expect(search_for_error?.message).toBe(
      ErrorEntity.FORGOT_PASSWORD_INVALID_TOKEN
    );
  });
});
