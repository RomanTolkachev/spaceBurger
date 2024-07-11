import {AppThunk, TUser} from "../../utils/types";
import {getUserData} from "../../utils/api";

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


