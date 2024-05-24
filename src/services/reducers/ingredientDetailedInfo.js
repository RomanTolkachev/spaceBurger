import {
    GET_DETAILED_INGREDIENT_INFO,
    CLEAR_DETAILED_INGREDIENT_INFO
} from "../actions/ingredientDetailedInfo";

const initialState = {};

export const ingredientDetailedInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAILED_INGREDIENT_INFO: {
            return {
                ...state,
                info: action.info,
            }
        }
        case CLEAR_DETAILED_INGREDIENT_INFO: {
            return {
                initialState
            }
        }
        default: {
            return state
        }
    }
}