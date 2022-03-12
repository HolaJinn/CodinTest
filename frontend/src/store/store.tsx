import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import AuthenticationReducer from "./AuthenticationSlice";
import RegistrationReducer from "./RegistrationSlice";
import EmailVerificationReducer from "./EmailVerificationSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    register: RegistrationReducer,
    verification: EmailVerificationReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
