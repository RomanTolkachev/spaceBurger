import {amendUserData, forgotPassword, getUserData, loginRequest, logOutRequest, registerUser} from "../../utils/api";

export const SET_USER =  "SET_USER";
export const CLEAR_USER = "CLEAR_USER"
export const SEND_EMAIL_START = "SEND_EMAIL_START"
export const SEND_EMAIL_FINISHED = "SEND_EMAIL_FINISHED"
export const AUTH_STATUS_CHECKED = "AUTH_STATUS_CHECKED"

export const checkUserAuth = () => {
    return (dispatch) => {
        getUserData()
        .then((res) => {
            dispatch({
                type: SET_USER,
                data: res.user
            });
        })
        .catch(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        })
        .finally(() => {
            dispatch({
                type: AUTH_STATUS_CHECKED,
            })
        })
    }
}

export const login = (res) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            data: res
        });
        dispatch({
            type: AUTH_STATUS_CHECKED
        });
    }
}

export const register = (resp) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            data: resp.user
        });
    }
}

export const logOut = () => {
    return (dispatch) => {
        logOutRequest()
        .then(() => {
            dispatch({
                type: CLEAR_USER,
            });
        })
        .catch((res) => {
            console.log('сработал кэтч в logOut', res)
        })
        .finally(() => {
            dispatch({
                type: AUTH_STATUS_CHECKED,
            });
        })
    }
}

export const requestCode = (form, navigate) => {
    return (dispatch) => {
        dispatch({
            type:SEND_EMAIL_START
        })
        forgotPassword(form, navigate)
        .then((res) => {
            return res
        })
        .finally(() => {
            dispatch({
                type:SEND_EMAIL_FINISHED
            });
        })
    };
}

export const requestAmendment = (form) => {
    return amendUserData(form)
        .then(res => {
            return dispatch => {
                dispatch({
                    type: SET_USER,
                    data: res
                })
            }
        })
}

