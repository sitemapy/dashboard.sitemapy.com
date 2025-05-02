import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { OrganizationRepositoryInMemory } from "@/modules/organization/repositories/organization.repository.in-memory";
import { actions, init } from "@/redux/store";
import { SitemapLogEntity } from "@sitemapy/interfaces";
import { ApiRepositoryInMemory } from "../../repositories/api.repository.in-memory";

describe("Feature: API", () => {
  it(`
    Given a logged in user
    When the user logs in
    Then the api key should be fetched
    And the logs should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    const organization_repository =
      dependencies.OrganizationRepository as OrganizationRepositoryInMemory;

    const organization = await organization_repository.create_organization({
      user_id: "test@test.com",
      name: "Test Organization",
    });

    if (organization.error) throw new Error("Organization not created");

    const api_repository = dependencies.ApiRepository as ApiRepositoryInMemory;

    api_repository._store_api_key({
      organization_id: organization.body.id,
      api_key: {
        key: "test_api_key",
        organization_id: organization.body.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const log: SitemapLogEntity = {
      id: "1",
      created_at: new Date(),
      fetching_duration: 1000,
      number_of_sitemap_fetched: 1,
      does_sitemap_contain_errors: false,
      mode: "pages_only",
      total_pages_in_sitemaps: 1,
      organization_id: organization.body.id,
      url: "https://example.com/sitemap.xml",
      source: "api",
    };

    api_repository._store_logs({
      organization_id: organization.body.id,
      logs: [log],
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@test.com",
        password: "password",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@test.com",
        password: "password",
      })
    );

    expect(store.getState().organization.current_organization?.name).toEqual(
      "Test Organization"
    );

    expect(store.getState().api.api_key?.key).toEqual("test_api_key");
    expect(store.getState().api.logs).toMatchObject([log]);
    expect(store.getState().api.total_logs).toEqual(1);
    expect(store.getState().api.total_pages).toEqual(1);
  });

  it(`
    Given a logged in user
    When the user changes the current page
    Then the current page should be changed
    And the logs should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    const organization_repository =
      dependencies.OrganizationRepository as OrganizationRepositoryInMemory;

    const organization = await organization_repository.create_organization({
      user_id: "test@test.com",
      name: "Test Organization",
    });

    if (organization.error) throw new Error("Organization not created");

    const api_repository = dependencies.ApiRepository as ApiRepositoryInMemory;

    const logs: Array<SitemapLogEntity> = Array.from(
      { length: 100 },
      (_, index) => ({
        id: index.toString(),
        created_at: new Date(),
        fetching_duration: 1000,
        number_of_sitemap_fetched: 1,
        does_sitemap_contain_errors: false,
        mode: "pages_only",
        total_pages_in_sitemaps: 1,
        url: "https://example.com/sitemap.xml",
        error_message: null,
        api_key_id: "api_key_id",
        organization_id: organization.body.id,
        source: "api",
      })
    );

    api_repository._store_logs({
      organization_id: organization.body.id,
      logs: logs,
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@test.com",
        password: "password",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@test.com",
        password: "password",
      })
    );

    expect(store.getState().organization.current_organization?.name).toEqual(
      "Test Organization"
    );

    expect(store.getState().api.total_logs).toEqual(100);
    expect(store.getState().api.current_page).toEqual(1);
    expect(store.getState().api.total_logs_per_page).toEqual(10);

    await store.dispatch(actions.api.go_to_next_page());

    expect(store.getState().api.current_page).toEqual(2);
    expect(store.getState().api.logs).toMatchObject(logs.slice(10, 20));

    await store.dispatch(actions.api.go_to_previous_page());

    expect(store.getState().api.current_page).toEqual(1);
    expect(store.getState().api.logs).toMatchObject(logs.slice(0, 10));

    await store.dispatch(actions.api.go_to_next_page());
    await store.dispatch(actions.api.change_total_logs_per_page(20));

    expect(store.getState().api.total_logs_per_page).toEqual(20);
    expect(store.getState().api.current_page).toEqual(1);
    expect(store.getState().api.logs).toMatchObject(logs.slice(0, 20));
  });

  it(`
    Given a logged in user
    When the user resets the api key
    Then the api key should be reset
    And the logs should be fetched
    And the modal should be closed
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.authentication.signup({
        email: "test@test.com",
        password: "password",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@test.com",
        password: "password",
      })
    );

    expect(store.getState().api.api_key?.key).toEqual("fake_api_key");

    await store.dispatch(actions.api.reset_api_key());

    expect(store.getState().api.api_key?.key).toEqual("reseted_fake_api_key");

    expect(store.getState().modal.history).toMatchObject([
      {
        type: "close",
        key: MODAL_KEYS.API_KEY_RESET,
      },
    ]);
  });

  it(`
    Given a logged in user
    When the user goes to the last page
    Then the current page should be the last page
    And the logs should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    const organization_repository =
      dependencies.OrganizationRepository as OrganizationRepositoryInMemory;

    const organization = await organization_repository.create_organization({
      user_id: "test@test.com",
      name: "Test Organization",
    });

    if (organization.error) throw new Error("Organization not created");

    const api_repository = dependencies.ApiRepository as ApiRepositoryInMemory;

    const logs: Array<SitemapLogEntity> = Array.from(
      { length: 100 },
      (_, index) => ({
        id: index.toString(),
        created_at: new Date(),
        fetching_duration: 1000,
        number_of_sitemap_fetched: 1,
        does_sitemap_contain_errors: false,
        mode: "pages_only",
        total_pages_in_sitemaps: 1,
        url: "https://example.com/sitemap.xml",
        error_message: null,
        api_key_id: "api_key_id",
        source: "api",
        organization_id: organization.body.id,
      })
    );

    api_repository._store_logs({
      organization_id: organization.body.id,
      logs: logs,
    });

    await store.dispatch(
      actions.authentication.signup({
        email: "test@test.com",
        password: "password",
      })
    );

    await store.dispatch(
      actions.authentication.login({
        email: "test@test.com",
        password: "password",
      })
    );

    await store.dispatch(actions.api.fetch_logs());
    await store.dispatch(actions.api.go_to_last_page());

    expect(store.getState().api.current_page).toEqual(10);
    expect(store.getState().api.logs).toMatchObject(logs.slice(-10));
  });
});
