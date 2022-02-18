import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Authorized: false,
};
export const AuthState = createSlice({
  name: "AuthType",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.Authorized = action.payload.AuthVal;
    },
  },
});
export const setAuthType = AuthState.actions.setAuthState;
export const AuthServiceType = (state) => state.AuthType.Authorized;

export default AuthState.reducer;
