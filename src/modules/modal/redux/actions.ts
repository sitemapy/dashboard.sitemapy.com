import { addHash, removeHash } from "@/lib/utils";
import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { AsyncThunkConfig } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
