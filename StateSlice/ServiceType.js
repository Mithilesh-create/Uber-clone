import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CabType: "",
};
export const TypeState = createSlice({
  name: "ServiceType",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.CabType = action.payload.CabType;
    },
  },
});
export const setType = TypeState.actions.setType;
export const CabServiceType = (state)=> state.ServiceType.CabType;

export default TypeState.reducer;
