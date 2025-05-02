import { addHash, removeHash } from "@/lib/utils";
import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { AsyncThunkConfig } from "@/redux/store";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const store_current_key = createAction<{ key: MODAL_KEYS }>(
  "modal/store_current_key"
);

export const sync = createAsyncThunk<void, void, AsyncThunkConfig>(
  "modal/sync",
  async (payload, { extra, dispatch }) => {
    const hash = extra.LocationService.getHash();

    const key = hash.replace("#", "").split("&")[0];

    dispatch(store_current_key({ key: key as MODAL_KEYS }));
  }
);

export const open = createAsyncThunk<
  { key: MODAL_KEYS; value?: unknown },
  { key: MODAL_KEYS; value?: unknown },
  AsyncThunkConfig
>("modal/open", async (payload, { extra }) => {
  extra.LocationService.navigate(
    addHash({
      path: payload.key,
      currentHash: extra.LocationService.getHash(),
      value: payload.value as string,
    })
  );

  return {
    key: payload.key,
    value: payload.value,
  };
});

export const close = createAsyncThunk<
  { key: MODAL_KEYS },
  { key: MODAL_KEYS },
  AsyncThunkConfig
>("modal/close", async (payload, { extra }) => {
  extra.LocationService.navigate(
    removeHash({
      path: payload.key,
      currentHash: extra.LocationService.getHash(),
    })
  );

  return {
    key: payload.key,
  };
});
