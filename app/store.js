import { configureStore } from "@reduxjs/toolkit";
import LocationAddressReducer from "../StateSlice/LocationSlice"
import CabTypeReducer from "../StateSlice/ServiceType"
export const store = configureStore({
  reducer: {
    LocationAddress: LocationAddressReducer,
    ServiceType: CabTypeReducer,

  },
});
