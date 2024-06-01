import { SET_USER, CLEAR_USER, SEND_EMAIL_START, SEND_EMAIL_FINISHED, AUTH_STATUS_CHECKED} from "../actions/user";

const initialState = {
    isAuthenticated: false,
    email: null,
    name: null,
    isRequestButtonLocked: false,
};

export const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                email: action.data.email,
                name: action.data.name,
            }
        }
        case CLEAR_USER: {
            return initialState
        }
        case AUTH_STATUS_CHECKED: {
            return {
                ...state,
                isAuthenticated: true,
            }
        }
        case SEND_EMAIL_START: {
            return {
                ...state,
                isRequestButtonLocked: true,
            }
        }
        case SEND_EMAIL_FINISHED: {
            return {
                ...state,
                isRequestButtonLocked: false,
            }
        }
        default: {
            return state;
        }
    }
}