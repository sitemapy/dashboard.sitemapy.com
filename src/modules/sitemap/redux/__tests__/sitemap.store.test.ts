import { SitemapResponse } from "@/modules/sitemap/entities/sitemap.entity";
import { actions } from "@/redux/actions";
import { init } from "@/redux/store";

describe("Feature: Sitemap", () => {
  const sitemap_url = "https://example.com/sitemap.xml";
  const sitemap_response: SitemapResponse = {
    url: sitemap_url,
    statusCode: 200,
    pages: [],
    type: "sitemap-index",
    sitemaps: [
      {
        url: "https://example.com/sitemap/index-1.xml",
        statusCode: 200,
        pages: [],
        type: "sitemap-index",
        sitemaps: [
          {
            url: "https://example.com/sitemap/index-1/pages.xml",
            statusCode: 200,
            pages: [],
            type: "sitemap",
            sitemaps: [],
            numberTotalOfPages: 20,
          },
        ],
        numberTotalOfPages: 20,
      },
    ],
    numberTotalOfPages: 20,
  };

  it(`
    Given a user
    When the user want to fetch a sitemap
    Then the sitemap should be fetched
  `, async () => {
    const { store, dependencies } = init({});

    dependencies.SitemapRepository._store_sitemap_response(
      sitemap_url,
      sitemap_response
    );

    await store.dispatch(
      actions.sitemap.fetch_sitemap({
        sitemap_url,
      })
    );

    expect(store.getState().global_events.history.length).toBe(0);
    expect(store.getState().sitemap.sitemap_url).toBe(sitemap_url);
    expect(store.getState().sitemap.sitemap_response).toBe(sitemap_response);
    expect(store.getState().sitemap.is_loading).toBe(false);
  });

  it(`
    Given a user
    When the user fetch a sitemap
    Then the result should be stored in history
    And the user should be see it
  `, async () => {
    const { store, dependencies } = init({});

    dependencies.SitemapRepository._store_sitemap_response(
      sitemap_url,
      sitemap_response
    );

    await store.dispatch(
      actions.sitemap.fetch_sitemap({
        sitemap_url,
      })
    );

    expect(store.getState().global_events.history.length).toBe(0);
    expect(store.getState().sitemap.sitemap_url).toBe(sitemap_url);
    expect(store.getState().sitemap.history.length).toBe(1);
    expect(store.getState().sitemap.history[0].sitemap_url).toBe(sitemap_url);
  });

  it(`
    Given a user
    When the user fetch history
    Then the result should be stored in history
  `, async () => {
    const { store, dependencies } = init({});

    await dependencies.SitemapRepository._store_sitemap_response(
      sitemap_url,
      sitemap_response
    );
    await dependencies.SitemapRepository.fetch_sitemap(sitemap_url);

    await store.dispatch(actions.sitemap.fetch_history());

    expect(store.getState().global_events.history.length).toBe(0);
    expect(store.getState().sitemap.history.length).toBe(1);
    expect(store.getState().sitemap.history[0].sitemap_url).toBe(sitemap_url);
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

    await dependencies.SitemapRepository._store_sitemap_response(
      sitemap_url,
      sitemap_response
    );

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
});
