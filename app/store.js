import { configureStore } from "@reduxjs/toolkit";
import LocationAddressReducer from "../StateSlice/LocationSlice";
import CabTypeReducer from "../StateSlice/ServiceType";
import AuthTypeReducer from "../StateSlice/AuthState";
export const store = configureStore({
  reducer: {
    LocationAddress: LocationAddressReducer,
    ServiceType: CabTypeReducer,
    AuthType: AuthTypeReducer,
  },
});
