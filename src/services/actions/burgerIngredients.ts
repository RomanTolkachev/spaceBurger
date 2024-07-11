import {AppThunk, IIngredient, TBurgerConstructor} from "../../utils/types";
import {fetchIngredients} from "../../utils/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IRootState} from "../reducers/root-reducer";
import {Action} from "redux";

export const FETCH_INGREDIENTS:"FETCH_INGREDIENTS" = "FETCH_INGREDIENTS";
export const FETCH_INGREDIENTS_SUCCESS: "FETCH_INGREDIENTS_SUCCESS" = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILED:"FETCH_INGREDIENTS_FAILED" = "FETCH_INGREDIENTS_FAILED";
export const SWITCH_TAB: 'SWITCH_TAB' = 'SWITCH_TAB'

export const setCurrentTab = (tab: string | undefined): TBurgerConstructor => {
    return {
        type: SWITCH_TAB,
        current: tab
    }
}

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

export function setIngredients(parsed: IIngredient[]): TBurgerConstructor {
    return {
        type: FETCH_INGREDIENTS_SUCCESS,
        data: parsed
    }
}



export const getIngredients = (): AppThunk => {
    return function(dispatch) {
        dispatch(startFetch());
        fetchIngredients()
            .then(res => dispatch(setIngredients(res.data)))
            .catch(() => dispatch(handleFailedFetch()));
    }
};