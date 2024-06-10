
export const SET_USER =  "SET_USER";
export const CLEAR_USER = "CLEAR_USER"
export const SEND_EMAIL_START = "SEND_EMAIL_START"
export const SEND_EMAIL_FINISHED = "SEND_EMAIL_FINISHED"
export const AUTH_STATUS_CHECKED = "AUTH_STATUS_CHECKED"


export const finishAuthStatus = () => {
    return (dispatch) => {
        dispatch({
            type: AUTH_STATUS_CHECKED,
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

export const setUser = (res) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            data: res.user
        });
    }
}

export const clearUser = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_USER,
        });
    }
}

export const blockButton = () => {
    return (dispatch) => {
        dispatch({
            type: SEND_EMAIL_START
        })
    }
}

export const unBlockButton = () => {
    return (dispatch) => {
        dispatch({
            type: SEND_EMAIL_FINISHED
        })
    }
}


