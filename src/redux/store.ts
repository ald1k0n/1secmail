import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import { argusApi } from "./services/argus.service";
import { submitApi } from "./services/submit.service";
import credentialSlice from "./slices/credential.slice";

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [argusApi.reducerPath]: argusApi.reducer,
  [submitApi.reducerPath]: submitApi.reducer,
  credentialSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(
      baseApi.middleware,
      argusApi.middleware,
      submitApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
