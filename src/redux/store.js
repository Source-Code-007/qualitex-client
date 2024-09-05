import { configureStore } from "@reduxjs/toolkit";
import { workPermit } from "./api/workPermit/workPermitApi";

export const store = configureStore({
  reducer: {
    [workPermit.reducerPath]: workPermit.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workPermit.middleware),
});

export default store;
