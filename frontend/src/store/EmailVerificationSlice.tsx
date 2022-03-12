import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

interface IVerificationState {
  verifiying: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

const initialState: IVerificationState = {
  verifiying: false,
  success: false,
  error: false,
  message: "",
};

export const EmailVerificationSlice: Slice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    verify: (state: RootStateOrAny, action: PayloadAction) => {
      state.verifiying = true;
    },

    verificationSuccess: (state, action) => {
      state.verifiying = false;
      state.success = true;
      state.error = false;
      state.message = "Your Email is verified";
    },

    verificationFailed: (state, action) => {
      state.verifiying = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
      console.log(action.payload);
    },
  },
});

//Actions
export const verificationActions = EmailVerificationSlice.actions;

export default EmailVerificationSlice.reducer;
