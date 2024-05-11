import {
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILED,
    SWITCH_TAB } from "../actions/burgerIngredients";

const initialState = {
    hello: "i am burgerIngredients store",
    ingredients: null,
    isLoading: false,
    hasError: false,
    currentTab: "buns",
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
        case SWITCH_TAB: {
            return {
                ...state,
                currentTab: action.current
            }
        }
        default: {
            return state
        }
    }
}