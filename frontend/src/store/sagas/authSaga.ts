import { verificationActions } from './../EmailVerificationSlice';
import { registrationActions } from './../RegistrationSlice';
import { registerUserService, verifyEmailService } from './../../services/authService';
import { call, put } from 'redux-saga/effects';
import { authActions } from '../AuthenticationSlice';
import { loginUserService } from '../../services/authService';

export function* loginSaga(payload: any): any {
    try {
        const response = yield call(loginUserService, payload)
        console.log("Response>>>>", response);
        yield put(authActions.loginSuccess(response))
    } catch (error) {
        yield put(authActions.loginFailed(error))
    }
}

export function* registrationSaga(payload: any): any {
    try {
        const response = yield call(registerUserService, payload)
        console.log(response)
        yield put(registrationActions.registerSuccess(response))
    } catch (error) {
        yield put(registrationActions.registerFailed(error))
    }
}

export function* verificationSaga(code: any) : any {
    try{
        const response = yield call(verifyEmailService, code.payload)
        yield put(verificationActions.verificationSuccess(response))
    } catch(error) {
        yield put(verificationActions.verificationFailed(error))
    }
}