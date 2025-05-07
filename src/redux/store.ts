import { api_reducer } from "@/modules/api/redux/reducers";
import { authentication_reducer } from "@/modules/authentication/redux/reducers";
import { build, Dependencies } from "@/modules/dependencies";
import { global_events_reducer } from "@/modules/global/redux/reducers";
import { modal_reducer } from "@/modules/modal/redux/reducers";
import { notifications_reducer } from "@/modules/notifications/redux/reducers";
import { organization_reducer } from "@/modules/organization/redux/reducers";
import { sitemap_reducer } from "@/modules/sitemap/redux/reducers";
import { usage_reducer } from "@/modules/usage/redux/reducers";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const reducers = combineReducers({
  modal: modal_reducer,
  notifications: notifications_reducer,
  authentication: authentication_reducer,
  global: global_events_reducer,
  organization: organization_reducer,
  sitemap: sitemap_reducer,
  api: api_reducer,
  usage: usage_reducer,
});

export const init = (initialState = {}, env?: "in-memory" | "api" | "demo") => {
  const dependencies = env ? build(env) : build("in-memory");

  const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

  return { store, dependencies };
};

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ReturnType<typeof init>["store"]["dispatch"];
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export * from "./actions";
