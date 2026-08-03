import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../lib/index"

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      global: globalReducer,
    },
  });

  return store;
};

export type AppStore=ReturnType<typeof makeStore>
export type RootState=ReturnType<AppStore['getState']>
export type AppDispatch=AppStore['dispatch']
