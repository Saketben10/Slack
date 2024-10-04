import { configureStore } from "@reduxjs/toolkit";
import renderreducer from "@/reducers/render";

export const store = configureStore({
  reducer: {
    render: renderreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
