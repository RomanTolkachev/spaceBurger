import { burgerIngredients } from "./burgerIngredients";
import {combineReducers} from "redux";
import { burgerCounstructor } from "./burgerCounstructor";

export const rootReducer = combineReducers({
    burgerConstructor: burgerCounstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: null,
    order: null,
});