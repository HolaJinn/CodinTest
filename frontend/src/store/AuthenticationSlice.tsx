import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

export interface LoginPayload {
  email: string;
  password: string;
}
interface IAuthState {
  isLoggedIn: boolean;
  logging: boolean;
  token: String;
  error: boolean;
  message: string;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  logging: false,
  token: "",
  error: false,
  message: "",
};

export const AuthenticationSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: RootStateOrAny, action: PayloadAction) => {
      state.logging = true;
      localStorage.removeItem("token");
    },

    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.logging = false;
      state.token = action.payload.jwtToken;
      state.error = false;
      state.message = "Logged In";
    },

    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.logging = false;
      state.token = "";
      state.error = true;
      state.message = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.logging = false;
      state.token = "";
      state.error = false;
      state.message = "Logging out";
      localStorage.removeItem("token");
    },
  },
});

//Actions
export const authActions = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
