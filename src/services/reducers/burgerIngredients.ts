import {FETCH_INGREDIENTS, FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILED, SWITCH_TAB } from "../actions/burgerIngredients";
import {IIngredient, TBurgerConstructor} from "../../utils/types";

const initialState: IBurgerIngredientsState = {
    ingredients: null,
    isLoading: false,
    hasError: false,
    currentTab: "buns",
    errorMessage: null,
}

interface IBurgerIngredientsState {
    ingredients: IIngredient[] | null,
    isLoading: boolean,
    hasError: boolean,
    currentTab: string | undefined,
    errorMessage: null | string,
}

export const burgerIngredients = (state: IBurgerIngredientsState = initialState, action: TBurgerConstructor): IBurgerIngredientsState => {

    switch (action.type) {
        case FETCH_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.data,
                isLoading: false,
            }
        }
        case FETCH_INGREDIENTS: {
            return {
                ...state,
                isLoading: true,
                hasError: false,
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