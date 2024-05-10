import {FETCH_INGREDIENTS, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILED} from "../actions/burgerIngredients";

const initialState = {
    hello: "i am burgerIngredients store",
    ingredients: null,
    isLoading: false,
    hasError: false
}
export const burgerIngredients = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_INGREDIENTS: {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            }
        }
        case FETCH_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.fetched,
                isLoading: false,
            }
        }
        case FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                errorMessage: action.error,
                hasError: true,
                isLoading: false,
            }
        }
        default: {
            return state
        }
    }
}