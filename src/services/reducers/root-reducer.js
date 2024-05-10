import { burgerIngredients } from "./burgerIngredients";
import {combineReducers} from "redux";
import {cartReducer} from "./cart";

export const rootReducer = combineReducers({
    cart: cartReducer,
    burgerIngredients: burgerIngredients,
});