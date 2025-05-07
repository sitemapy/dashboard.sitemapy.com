import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";
import { SitemapResponse } from "@sitemapy/interfaces";
import { uniqBy } from "lodash";
import { extract_sitemap_data } from "../utils/extract-sitemap-data";

export type sitemap_state = {
  sitemap_url: string | null;
  is_loading: boolean;
  history: Array<{
    sitemap_url: string;
    created_at: Date;
  }>;
  history_is_loading: boolean;
  sitemap_response: SitemapResponse[];
  collapsed_folders: Array<string>;
};

const initial_state: sitemap_state = {
  sitemap_url: null,
  sitemap_response: [],
  is_loading: false,
  history: [],
  history_is_loading: false,
  collapsed_folders: [],
};

export const sitemap_reducer = createReducer(initial_state, (builder) => {
  builder.addCase(actions.sitemap._store_sitemap_response, (state, action) => {
    state.sitemap_url = action.payload.sitemap_url;
    state.sitemap_response = action.payload.sitemap_response;
    state.history = uniqBy(
      [
        {
          sitemap_url: action.payload.sitemap_url,
          created_at: new Date(),
        },
        ...state.history,
      ],
      "sitemap_url"
    );

    state.collapsed_folders = action.payload.sitemap_response.flatMap(
      (sitemap) =>
        extract_sitemap_data<string>(sitemap, (element) => {
          if (element.type === "sitemap-index") return element.url;
          return undefined;
        })
    );
  });

  builder.addCase(actions.sitemap._store_history, (state, action) => {
    state.history = action.payload.history;
  });

  builder.addCase(actions.sitemap._set_sitemap_url, (state, action) => {
    state.sitemap_url = action.payload.sitemap_url;
  });

  builder.addCase(actions.sitemap._toggle_collapse_folder, (state, action) => {
    if (state.collapsed_folders.includes(action.payload.id)) {
      state.collapsed_folders = state.collapsed_folders.filter(
        (folder) => folder !== action.payload.id
      );
    } else {
      state.collapsed_folders.push(action.payload.id);
    }
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

  builder.addCase(actions.global.logout, () => {
    return initial_state;
  });
});
