import { takeLatest } from "redux-saga/effects";
import { loginSaga, registrationSaga, verificationSaga } from "./authSaga";
import { authActions } from "../AuthenticationSlice";
import { registrationActions } from "../RegistrationSlice";
import { verificationActions } from "../EmailVerificationSlice";

export default function* watchUserAuthentication() {
    yield takeLatest(authActions.login.type, loginSaga)
    yield takeLatest(registrationActions.register.type, registrationSaga)
    yield takeLatest(verificationActions.verify.type, verificationSaga)
}
