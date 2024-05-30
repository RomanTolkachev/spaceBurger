import { SET_USER, CLEAR_USER} from "../actions/user";

const initialState = {
    isAuthenticated: false,
    email: null,
    name: null,
    isOrderButtonLocked: false,
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
        default: {
            return state;
        }
    }
}