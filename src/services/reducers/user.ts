import { SET_USER, CLEAR_USER, SEND_EMAIL_START, SEND_EMAIL_FINISHED, AUTH_STATUS_CHECKED} from "../actions/user";
import {TUser} from "../../utils/types";

const initialState: IUserState = {
    isAuthChecked: false,
    email: null,
    name: null,
    isRequestButtonLocked: false,
};

export interface IUserState {
    isAuthChecked: boolean,
    email: null | string,
    name: null | string,
    isRequestButtonLocked: boolean,
}

export const userInfo = (state: IUserState = initialState, action: TUser):  IUserState => {
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
                isAuthChecked: true,
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