import { combineReducers } from "redux";
import { burgerIngredients } from "./burgerIngredients";
import { burgerConstructor } from "./burgerCounstructor";
import { ingredientDetailedInfo } from "./ingredientDetailedInfo";
import { orderStore } from "./order";
import { userInfo } from "./user"

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: ingredientDetailedInfo,
    orderStore: orderStore,
    userInfo: userInfo,
});