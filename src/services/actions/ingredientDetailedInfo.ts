import {IIngredient, TDetailedInfo} from "../../utils/types";

export const GET_DETAILED_INGREDIENT_INFO: 'GET_DETAILED_INGREDIENT_INFO' = 'GET_DETAILED_INGREDIENT_INFO';
export const CLEAR_DETAILED_INGREDIENT_INFO: 'CLEAR_DETAILED_INGREDIENT_INFO' = 'CLEAR_DETAILED_INGREDIENT_INFO'

export const configureDetailedInfo = (info: IIngredient): TDetailedInfo => {
    return {
        type: GET_DETAILED_INGREDIENT_INFO,
        info: info
    }
}

export const clearDetailedInfo = (): TDetailedInfo => {
    return {
        type: CLEAR_DETAILED_INGREDIENT_INFO,
    }
}