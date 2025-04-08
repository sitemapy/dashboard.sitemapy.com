import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SitemapResponse } from "@sitemapy/interfaces";

export const _store_sitemap_response = createAction<{
  sitemap_url: string;
  sitemap_response: SitemapResponse[];
}>("sitemap/_store_sitemap_response");

export const _toggle_collapse_folder = createAction<{
  id: string;
}>("sitemap/_toggle_collapse_folder");

export const _set_fetching_sitemap_loading = createAction<boolean>(
  "sitemap/_set_fetching_sitemap_loading"
);

export const fetch_sitemap = createAsyncThunk<
  void,
  { sitemap_url: string },
  AsyncThunkConfig
>("sitemap/fetch_sitemap", async (params, { dispatch, extra }) => {
  dispatch(_set_fetching_sitemap_loading(true));

  const sitemap_response = await extra.SitemapRepository.fetch_sitemap(
    params.sitemap_url
  );

  dispatch(_set_fetching_sitemap_loading(false));

  if (sitemap_response.error) {
    dispatch(actions.global_events.error({ error: sitemap_response.code }));
    return;
  }

  dispatch(
    _store_sitemap_response({
      sitemap_url: params.sitemap_url,
      sitemap_response: sitemap_response.body,
    })
  );
});

export const _set_fetching_history_loading = createAction<boolean>(
  "sitemap/_set_fetching_history_loading"
);
