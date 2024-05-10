import { burgerIngredients } from "./burgerIngredients";
import { combineReducers } from "redux";
import { burgerConstructor } from "./burgerCounstructor";
import { ingredientDetailedInfo } from "./ingredientDetailedInfo";
import { TOGGLE_MODAL } from "../actions/root-reducer";

const initialState = {isModalOpen: false}
const common = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL: {
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: ingredientDetailedInfo,
    common: common,
    order: null,
});