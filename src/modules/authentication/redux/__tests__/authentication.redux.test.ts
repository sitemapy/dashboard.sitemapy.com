import { actions } from "@/redux/actions";
import { init } from "@/redux/store";

describe("Feature: Authentication", () => {
  it(`
    Given a user is not logged in
    When the user signs up
    Then the user should be logged in
  `, async () => {
    const { store } = init({});

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
});
