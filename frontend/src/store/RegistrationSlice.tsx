import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

export interface LoginPayload {
  email: string;
  password: string;
}
interface IRegistrationState {
  registering: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

const initialState: IRegistrationState = {
  registering: false,
  success: false,
  error: false,
  message: "",
};

export const RegistrationSlice: Slice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    register: (state: RootStateOrAny, action: PayloadAction) => {
      state.registering = true;
    },

    registerSuccess: (state, action) => {
      state.registering = false;
      state.success = true;
      state.error = false;
      state.message =
        "Registration successful, a verification link is sent to your email";
    },

    registerFailed: (state, action) => {
      state.registering = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
      console.log(action.payload);
    },
  },
});

//Actions
export const registrationActions = RegistrationSlice.actions;

export default RegistrationSlice.reducer;
