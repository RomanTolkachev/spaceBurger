import {
    GET_DETAILED_INGREDIENT_INFO,
    CLEAR_DETAILED_INGREDIENT_INFO
} from "../actions/ingredientDetailedInfo";
import {IIngredient, TDetailedInfo} from "../../utils/types";

interface IDetailedIngredientStore {
    info?: IIngredient | null
}

const initialState: IDetailedIngredientStore= {};

export const ingredientDetailedInfo = (state: IDetailedIngredientStore = initialState, action: TDetailedInfo): IDetailedIngredientStore => {
    switch (action.type) {
        case GET_DETAILED_INGREDIENT_INFO: {
            return {
                ...state,
                info: action.info,
            }
        }
        case CLEAR_DETAILED_INGREDIENT_INFO: {
            return initialState
        }
        default: {
            return state
        }
    }
}