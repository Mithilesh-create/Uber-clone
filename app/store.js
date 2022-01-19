import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "../StateSlice/ExampleSlice"
export const store = configureStore({
  reducer: {
    ExampleValues: exampleReducer,
  },
});
