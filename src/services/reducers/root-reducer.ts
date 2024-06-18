import { combineReducers } from "redux";
import {burgerIngredients, IBurgerIngredientsState} from "./burgerIngredients";
import {burgerConstructor, IBurgerConstructorStore} from "./burgerCounstructor";
import {IDetailedIngredientStore, ingredientDetailedInfo} from "./ingredientDetailedInfo";
import {IOrderStore, orderStore} from "./order";
import {IUserState, userInfo} from "./user"
import {TBurgerConstructor} from "../../utils/types";

export interface IRootState {
    burgerConstructor: IBurgerConstructorStore,
    burgerIngredients: IBurgerIngredientsState,
    ingredientDetailedInfo: IDetailedIngredientStore,
    orderStore: IOrderStore,
    userInfo: IUserState,
}

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructor,
    burgerIngredients: burgerIngredients,
    ingredientDetailedInfo: ingredientDetailedInfo,
    orderStore: orderStore,
    userInfo: userInfo,
});