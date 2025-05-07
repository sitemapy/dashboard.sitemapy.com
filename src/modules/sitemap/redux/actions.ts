import { MessageI18nKeys } from "@/intl";
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

export const _set_sitemap_url = createAction<{
  sitemap_url: string;
}>("sitemap/_set_sitemap_url");

export const fetch_sitemap = createAsyncThunk<
  void,
  { sitemap_url: string },
  AsyncThunkConfig
>("sitemap/fetch_sitemap", async (params, { dispatch, extra, getState }) => {
  const { organization } = getState();

  dispatch(_set_sitemap_url({ sitemap_url: params.sitemap_url }));
  dispatch(_set_fetching_sitemap_loading(true));

  actions.sitemap._store_sitemap_response({
    sitemap_url: params.sitemap_url,
    sitemap_response: [],
  });

  const sitemap_response = await extra.SitemapRepository.fetch_sitemap({
    sitemap_url: params.sitemap_url,
    organization_id: organization.current_organization?.id as string,
  });

  dispatch(_set_fetching_sitemap_loading(false));

  if (sitemap_response.error) {
    dispatch(
      actions.global.error({
        error: sitemap_response.code as MessageI18nKeys,
      })
    );
    return;
  }

  dispatch(
    actions.sitemap._store_sitemap_response({
      sitemap_url: params.sitemap_url,
      sitemap_response: sitemap_response.body,
    })
  );

  dispatch(
    actions.global.sitemap_was_fetched({
      sitemap_url: params.sitemap_url,
    })
  );
});

export const _store_history = createAction<{
  history: { sitemap_url: string; created_at: Date }[];
}>("sitemap/_store_history");

export const fetch_history = createAsyncThunk<void, void, AsyncThunkConfig>(
  "sitemap/fetch_history",
  async (params, { dispatch, extra, getState }) => {
    const { organization } = getState();

    dispatch(_set_fetching_history_loading(true));

    const history = await extra.SitemapRepository.fetch_history(
      organization.current_organization?.id as string
    );

    dispatch(_set_fetching_history_loading(false));

    if (history.error) {
      dispatch(actions.global.error({ error: history.code }));
      return;
    }

    dispatch(actions.sitemap._store_history({ history: history.body }));
  }
);

export const _set_fetching_history_loading = createAction<boolean>(
  "sitemap/_set_fetching_history_loading"
);
