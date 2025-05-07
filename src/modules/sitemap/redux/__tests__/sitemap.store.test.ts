import { SitemapRepositoryInMemory } from "@/modules/sitemap/repositories/sitemap.repository.in-memory";
import { actions, init } from "@/redux/store";
import { SitemapResponse } from "@sitemapy/interfaces";

describe("Feature: Sitemap", () => {
  const sitemap_url = "https://example.com/sitemap.xml";
  const sitemap_response: SitemapResponse = {
    url: sitemap_url,
    status_code: 200,
    does_sitemap_contain_errors: false,
    number_total_of_sitemaps: 0,
    fetching_duration: 0,
    type: "sitemap-index",
    sitemap_parent_url: null,
    number_total_of_pages: 20,
    children: [
      {
        url: "https://example.com/sitemap/index-1.xml",
        status_code: 200,
        type: "sitemap-index",
        sitemap_parent_url: "https://example.com/sitemap/index-1.xml",
        number_total_of_pages: 20,
        does_sitemap_contain_errors: false,
        number_total_of_sitemaps: 0,
        fetching_duration: 0,
        children: [
          {
            does_sitemap_contain_errors: false,
            fetching_duration: 0,
            number_total_of_sitemaps: 0,
            url: "https://example.com/sitemap/index-1/pages.xml",
            status_code: 200,
            type: "sitemap",
            sitemap_parent_url: "https://example.com/sitemap/index-1.xml",
            number_total_of_pages: 20,
            children: [],
          },
        ],
      },
    ],
  };

  it(`
    Given a user
    When the user want to fetch a sitemap
    Then the sitemap should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    const sitemap_repository =
      dependencies.SitemapRepository as SitemapRepositoryInMemory;

    sitemap_repository._store_sitemap_response(sitemap_url, [sitemap_response]);

    await store.dispatch(
      actions.sitemap.fetch_sitemap({
        sitemap_url,
      })
    );

    expect(store.getState().global.history.length).toBe(0);
    expect(store.getState().sitemap.sitemap_url).toBe(sitemap_url);
    expect(store.getState().sitemap.sitemap_response).toMatchObject([
      sitemap_response,
    ]);
    expect(store.getState().sitemap.is_loading).toBe(false);
  });

  it(`
    Given a user
    When the user fetch a sitemap
    Then the result should be stored
  `, async () => {
    const { store, dependencies } = init({});

    const sitemap_repository =
      dependencies.SitemapRepository as SitemapRepositoryInMemory;

    sitemap_repository._store_sitemap_response(sitemap_url, [sitemap_response]);

    await store.dispatch(
      actions.sitemap.fetch_sitemap({
        sitemap_url,
      })
    );

    expect(store.getState().global.history.length).toBe(0);
    expect(store.getState().sitemap.sitemap_url).toBe(sitemap_url);
  });

  it(`
    Given a user
    When the user try to collapse a sitemap
    Then the sitemap should be collapsed
  `, async () => {
    const { store } = init({});

    store.dispatch(
      actions.sitemap._toggle_collapse_folder({ id: sitemap_url })
    );

    expect(store.getState().sitemap.collapsed_folders.length).toBe(1);
    expect(
      store.getState().sitemap.collapsed_folders.includes(sitemap_url)
    ).toBe(true);
  });

  it(`    
    Given a user
    When the sitemap is fetched
    Then all sitemap-index should be collapsed by default
  `, async () => {
    const { store, dependencies } = init({});

    const sitemap_repository =
      dependencies.SitemapRepository as SitemapRepositoryInMemory;

    sitemap_repository._store_sitemap_response(sitemap_url, [sitemap_response]);

    await store.dispatch(
      actions.sitemap.fetch_sitemap({
        sitemap_url,
      })
    );

    expect(store.getState().sitemap.collapsed_folders.length).toBe(2);
    expect(store.getState().sitemap.collapsed_folders).toEqual([
      "https://example.com/sitemap.xml",
      "https://example.com/sitemap/index-1.xml",
    ]);
  });

  it(`    
    Given a user
    When the user select an organization
    Then the sitemap history should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    const sitemap_repository =
      dependencies.SitemapRepository as SitemapRepositoryInMemory;

    sitemap_repository._store_sitemap_response(sitemap_url, [sitemap_response]);
    sitemap_repository._store_history(sitemap_url);

    await store.dispatch(
      actions.global.organization_selected({
        organization: {
          id: "1",
          name: "Organization 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
      })
    );

    expect(store.getState().sitemap.history.length).toBe(1);
    expect(store.getState().sitemap.history[0]).toMatchObject({ sitemap_url });
  });
});
