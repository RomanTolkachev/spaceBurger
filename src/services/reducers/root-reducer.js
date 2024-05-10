import { burgerIngredients } from "./burgerIngredients";
import { combineReducers } from "redux";
import { burgerConstructor } from "./burgerCounstructor";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: null,
    order: null,
});