import { NotificationEntity } from "@/modules/notifications/entities/notifications.entity";
import { actions } from "@/redux/actions";
import { createReducer } from "@reduxjs/toolkit";

interface NotificationsState {
  notifications: Array<NotificationEntity>;
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notifications_reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.notifications.store, (state, action) => {
    return {
      ...state,
      notifications: [action.payload, ...state.notifications].slice(0, 10),
    };
  });
});
