import { createReducer } from "@reduxjs/toolkit";
import { NotificationEntity } from "../entities/notifications.entity";
import { remove, store } from "./actions";
interface NotificationsState {
  notifications: Array<NotificationEntity>;
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notifications_reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(store, (state, action) => {
      state.notifications.push(action.payload);
    })
    .addCase(remove, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    });
});
