import { combineReducers } from "redux";
import {burgerIngredients} from "./burgerIngredients";
import {burgerConstructor} from "./burgerCounstructor";
import {ingredientDetailedInfo} from "./ingredientDetailedInfo";
import {orderStore} from "./order";
import {userInfo} from "./user"
import {store} from "../../index";
import {feedTableReducer} from "./socket";
import {detailedOrderInfo} from "./orderDetailedInfo";
import {personalOrdersReducer} from "./ownOrderSocket";

export type IRootState = ReturnType<typeof store.getState>

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: ingredientDetailedInfo,
    orderStore: orderStore,
    userInfo: userInfo,
    feedTableReducer: feedTableReducer,
    detailedOrderInfo: detailedOrderInfo,
    personalOrdersReducer: personalOrdersReducer
});