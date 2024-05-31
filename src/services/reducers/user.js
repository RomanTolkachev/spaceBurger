import { SET_USER, CLEAR_USER, SEND_EMAIL_START, SEND_EMAIL_FINISHED} from "../actions/user";

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
                email: action.email,
                name: action.name,
            }
        }
        case CLEAR_USER: {
            return initialState
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