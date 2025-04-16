import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, Log } from "../repositories/api.repository";

export const _store_api_key = createAction<ApiKey>("api/_store_api_key");
export const _store_logs = createAction<{
  logs: Array<Log>;
  total_logs: number;
  total_pages: number;
}>("api/_store_logs");

export const fetch_api_key = createAsyncThunk<void, void, AsyncThunkConfig>(
  "api_keys/fetch",
  async (_, { extra, dispatch, getState }) => {
    const organization_id = getState().organization.current_organization
      ?.id as string;

    const response = await extra.ApiRepository.fetch_api_key({
      organization_id,
    });

    if (response.error) {
      dispatch(
        actions.global_events.error({
          error: response.code,
        })
      );

      return;
    }

    dispatch(_store_api_key(response.body.api_key));
  }
);

export const _set_current_page = createAction<number>("api/_set_current_page");
export const _set_total_logs_per_page = createAction<number>(
  "api/_set_total_logs_per_page"
);
export const _set_is_loading = createAction<boolean>("api/_set_is_loading");
export const change_current_page = createAsyncThunk<
  void,
  number,
  AsyncThunkConfig
>("api/change_current_page", async (current_page, { dispatch }) => {
  dispatch(_set_current_page(current_page));
  await dispatch(fetch_logs());
});

export const go_to_next_page = createAsyncThunk<void, void, AsyncThunkConfig>(
  "api/go_to_next_page",
  async (_, { dispatch, getState }) => {
    const { api } = getState();
    if (api.current_page < api.total_pages) {
      dispatch(_set_current_page(api.current_page + 1));
      await dispatch(fetch_logs());
    }
  }
);

export const go_to_previous_page = createAsyncThunk<
  void,
  void,
  AsyncThunkConfig
>("api/go_to_previous_page", async (_, { dispatch, getState }) => {
  const { api } = getState();
  if (api.current_page > 1) {
    dispatch(_set_current_page(api.current_page - 1));
    await dispatch(fetch_logs());
  }
});

export const change_total_logs_per_page = createAsyncThunk<
  void,
  number,
  AsyncThunkConfig
>(
  "api/change_total_logs_per_page",
  async (total_logs_per_page, { dispatch }) => {
    dispatch(_set_total_logs_per_page(total_logs_per_page));
    await dispatch(fetch_logs());
  }
);

export const fetch_logs = createAsyncThunk<void, void, AsyncThunkConfig>(
  "api/fetch_logs",
  async (_, { extra, dispatch, getState }) => {
    const { api } = getState();

    const organization_id = getState().organization.current_organization
      ?.id as string;

    dispatch(_set_is_loading(true));

    const response = await extra.ApiRepository.fetch_logs({
      organization_id,
      current_page: api.current_page,
      how_many_logs_per_page: api.total_logs_per_page,
    });

    dispatch(_set_is_loading(false));

    if (response.error) {
      dispatch(
        actions.global_events.error({
          error: response.code,
        })
      );

      return;
    }

    dispatch(
      _store_logs({
        logs: response.body.logs,
        total_logs: response.body.total_logs,
        total_pages: response.body.total_pages,
      })
    );
  }
);
