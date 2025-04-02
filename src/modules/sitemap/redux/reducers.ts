import {
  SitemapHistory,
  SitemapResponse,
} from "@/modules/sitemap/entities/sitemap.entity";
import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";

export type sitemap_state = {
  sitemap_url: string | null;
  is_loading: boolean;
  history: SitemapHistory[];
  history_is_loading: boolean;
  sitemap_response: SitemapResponse | null;
};

const initial_state: sitemap_state = {
  sitemap_url: null,
  sitemap_response: null,
  is_loading: false,
  history: [],
  history_is_loading: false,
};

export const sitemap_reducer = createReducer(initial_state, (builder) => {
  builder.addCase(actions.sitemap._store_sitemap_response, (state, action) => {
    state.sitemap_url = action.payload.sitemap_url;
    state.sitemap_response = action.payload.sitemap_response;
    state.history.unshift({
      sitemap_url: action.payload.sitemap_url,
      sitemap_response: action.payload.sitemap_response,
      created_at: new Date(),
    });
  });

  builder.addCase(
    actions.sitemap._set_fetching_sitemap_loading,
    (state, action) => {
      state.is_loading = action.payload;
    }
  );

  builder.addCase(
    actions.sitemap._set_fetching_history_loading,
    (state, action) => {
      state.history_is_loading = action.payload;
    }
  );

  builder.addCase(actions.sitemap._store_history, (state, action) => {
    state.history = action.payload;
  });
});
