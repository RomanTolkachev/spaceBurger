import {IIngredient, TBurgerConstructor} from "../../utils/types";

export const FETCH_INGREDIENTS:"FETCH_INGREDIENTS" = "FETCH_INGREDIENTS";
export const FETCH_INGREDIENTS_SUCCESS: "FETCH_INGREDIENTS_SUCCESS" = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILED:"FETCH_INGREDIENTS_FAILED" = "FETCH_INGREDIENTS_FAILED";
export const SWITCH_TAB: 'SWITCH_TAB' = 'SWITCH_TAB'


export function handleFailedFetch(): TBurgerConstructor {
    return {
        type: FETCH_INGREDIENTS_FAILED,
        error: "404"
    }
}

export function startFetch(): TBurgerConstructor {
    return {
        type: FETCH_INGREDIENTS
    }
}

export function setIngredients(parsed: {data: IIngredient[]}): TBurgerConstructor {
    return {
        type: FETCH_INGREDIENTS_SUCCESS,
        data: parsed.data
    }
}

export const setCurrentTab = (tab: string | undefined): TBurgerConstructor => {
    return {
        type: SWITCH_TAB,
        current: tab
    }
}