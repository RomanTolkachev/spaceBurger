import {FETCH_INGREDIENTS, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILED} from "../actions/burgerIngredients";

const initialState = {hello: "i am burgerIngredients store", ingredients: null,}
export const burgerIngredients = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_INGREDIENTS: {
            return {
                ...state,
                vlados: 'privet'
            }
        }
        case FETCH_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.fetched
            }
        }
        case FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        default: {
            return state
        }
    }
}