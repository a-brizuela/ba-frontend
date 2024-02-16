import { configureStore } from "@reduxjs/toolkit";
import pnrReducer from "./pnrSlice";
import selectedTravelerReducer from "./selectedTraveler";

export const store = configureStore({
  reducer: {
    pnr: pnrReducer,
    selectedTraveler: selectedTravelerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
