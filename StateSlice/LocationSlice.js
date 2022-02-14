import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startLocation: "",
  endLocation: "",
};
export const Location = createSlice({
  name: "LocationAddress",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.startLocation = action.payload.startLocation;
      state.endLocation = action.payload.endLocation;
    },
    setStart: (state, action) => {
      state.startLocation = action.payload.startLocation;
    },
    setEnd: (state, action) => {
      state.endLocation = action.payload.endLocation;
    },
  },
});
export const setLocation = Location.actions.setLocation;
export const setStartLoc = Location.actions.setStart;
export const setEndLoc = Location.actions.setEnd;
export const startLocation = (state)=>state.LocationAddress.startLocation;
export const endLocation = (state)=>state.LocationAddress.endLocation;

export default Location.reducer;
