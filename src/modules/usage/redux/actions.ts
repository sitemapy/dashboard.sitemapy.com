import { actions } from "@/redux/actions";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const _set_is_loading = createAction<boolean>("usage/_set_is_loading");

export const _store_usage = createAction<{
  current_usage: number;
  total_usage_limit: number;
  usage_reset_date: Date;
}>("usage/_store_usage");

export const fetch_usage = createAsyncThunk<void, void, AsyncThunkConfig>(
  "usage/fetch_usage",
  async (_, { extra, dispatch, getState }) => {
    const organization_id = getState().organization.current_organization
      ?.id as string;

    dispatch(_set_is_loading(true));

    const response = await extra.UsageRepository.get_usage({
      organization_id,
    });

    dispatch(_set_is_loading(false));

    if (response.error) {
      dispatch(
        actions.global.error({
          error: response.code,
        })
      );
      return;
    }

    dispatch(
      _store_usage({
        current_usage: response.body.current_usage,
        total_usage_limit: response.body.total_usage_limit,
        usage_reset_date: response.body.usage_reset_date,
      })
    );
  }
);
