import {fetchWithRefresh, getUserData, loginRequest, refreshToken, registerUser} from "../../utils/api";

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
            console.log('стработал then в checkUserAuth', res)
        })
        .catch(() => {
            console.log('сработал кэтч в checkUserAuth')
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

export const login = async (form) => {
    const loginData = await loginRequest(form)
    console.log(loginData.user)
    return (dispatch) => {
         dispatch({
            type: SET_USER,
            data: loginData.user
        });
        dispatch({
            type: AUTH_STATUS_CHECKED
        });
    }
}

export const register = (form) => {
    return (dispatch) => {
        registerUser(form)
        .then(res => {
            dispatch({
                type: SET_USER,
                data: res.user
            });
        })
        .catch((res) => {
            console.log('сработал кэтч в register', res)
        })
    }
}

