import {
    AppThunk,
    IForgotPassForm, ILeaveResponse, ILoginForm, ILogOut, IRegisterForm,
    IRegisterUserResponse,
    IRequestForgotPassCode,
    TNavigate,
    TUser
} from "../../utils/types";
import {getUserData, loginRequest, logOutRequest, registerUser, requestForgotPassCode} from "../../utils/api";
import React, {FormEvent} from "react";

export const SET_USER: "SET_USER" =  "SET_USER";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER"
export const SEND_EMAIL_START: "SEND_EMAIL_START" = "SEND_EMAIL_START"
export const SEND_EMAIL_FINISHED: "SEND_EMAIL_FINISHED" = "SEND_EMAIL_FINISHED"
export const AUTH_STATUS_CHECKED: "AUTH_STATUS_CHECKED" = "AUTH_STATUS_CHECKED"

export const finishAuthStatus = (): TUser => {
    return {
        type: AUTH_STATUS_CHECKED,
    }
}

interface IUserResponse {
    success: boolean,
    user: {
        email: string,
        name: string
    }
}

export const setUser = (res: IUserResponse): TUser => {
    return {
        type: SET_USER,
        data: res.user
    };
}

export const clearUser = (): TUser => {
    return {
        type: CLEAR_USER,
    };
}

export const blockButton = (): TUser => {
    return {
        type: SEND_EMAIL_START
    }
}

export const unBlockButton = (): TUser => {
    return {
        type: SEND_EMAIL_FINISHED
    }
}

export const getUser = (): AppThunk => {
    return dispatch => {
        if (localStorage.getItem('accessToken')) {
            getUserData()
                .then(res => dispatch(setUser(res)))
                .catch((): void => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                })
                .finally((): void => {
                    dispatch(finishAuthStatus())
                })
        } else {
            dispatch(finishAuthStatus())
        }
    }
}

export const requestCode = (form: IForgotPassForm, navigate: TNavigate):AppThunk => {
    const handlePassCodeSuccess = (message: string): void => {
        localStorage.setItem('resetPasswordTokenSent', "yes");
        alert(message)
        navigate("/reset-password")
    }
    return dispatch => {
        dispatch(blockButton());
        requestForgotPassCode(form)
            .then((res: IRequestForgotPassCode): void => res.message === 'Reset email sent' ? handlePassCodeSuccess(res.message) : undefined)
            .catch(err => alert(err))
            .finally(() => dispatch(unBlockButton()))
    }
}

export const letMeLogin = (form:ILoginForm):AppThunk => {
    return dispatch => {
    const handleLoginSuccess = (res: IRegisterUserResponse) => {
        localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken)
        return dispatch(setUser(res))
    }
    loginRequest(form)
        .then((res: IRegisterUserResponse) => {
            if (res.success) {
                return handleLoginSuccess(res);
            } else {
                return alert(res)
            }
        })
        .catch(err => alert(err))
    }
}

export const letMeRegister = (form: IRegisterForm):AppThunk => {
    return dispatch => {
        registerUser(form)
            .then((res: IRegisterUserResponse): void => {dispatch(setUser(res))})
            .catch(err => err.message === "User already exists" ? alert('пользователь с таким email уже существует') : undefined)
    }
}

export const letMeLeave = ():AppThunk => {
    return dispatch => {
        const handleLaveSuccess = (res: ILeaveResponse) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alert(res.message)
            return dispatch(clearUser())
        }
        logOutRequest()
            .then((res: ILogOut) => res.success ? handleLaveSuccess(res) : undefined )
            .catch(err => alert(err))
            .finally(() => dispatch(finishAuthStatus()))
    }
}







