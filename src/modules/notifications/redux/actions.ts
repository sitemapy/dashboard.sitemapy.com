import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationEntity } from "../entities/notifications.entity";

export const store = createAction<NotificationEntity>("notifications/store");

export const remove = createAction<{ id: number }>("notifications/remove");

export const create = createAsyncThunk<void, Omit<NotificationEntity, "id">>(
  "notifications/create",
  async (snack, { dispatch }) => {
    const id = Date.now();
    const timeout = snack.timeout || 10000;

    dispatch(store({ ...snack, id, timeout }));

    setTimeout(() => dispatch(remove({ id })), timeout);
  }
);
