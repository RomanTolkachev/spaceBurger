import {HANDLE_CLEAR_CART, HANDLE_DELETE, HANDLE_DROP, HANDLE_SWAP_CARD} from "../services/actions/burgerCounstructor";
import {FETCH_INGREDIENTS, FETCH_INGREDIENTS_FAILED, FETCH_INGREDIENTS_SUCCESS, SWITCH_TAB} from "../services/actions/burgerIngredients";
import {CLEAR_DETAILED_INGREDIENT_INFO, GET_DETAILED_INGREDIENT_INFO} from "../services/actions/ingredientDetailedInfo";
import {CLEAR_ORDER_NUMBER, ORDER_PROCESSING_FINISHED, ORDER_SENT, ORDER_SENT_FAILED, ORDER_SENT_SUCCESS} from "../services/actions/order";
import {AUTH_STATUS_CHECKED, CLEAR_USER, SEND_EMAIL_FINISHED, SEND_EMAIL_START, SET_USER} from "../services/actions/user";

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export interface IConstructorIngredient extends IIngredient {
    dynamicId: string
}


// Типизация экшенов для BurgerConstructor
interface IHandleDrop {
    type: typeof HANDLE_DROP,
    droppableItem: IConstructorIngredient
}

interface IHandleDelete {
    type: typeof HANDLE_DELETE,
    deletableItemId: string
}

interface IHandleSwap {
    type: typeof HANDLE_SWAP_CARD,
    dragIndex: number,
    hoverIndex: number
}

interface IHandleClearCart {
    type: typeof HANDLE_CLEAR_CART,
}

export type TConstructorActionType = IHandleClearCart | IHandleSwap | IHandleDelete | IHandleDrop



// Типы для BurgerIngredients
export interface IStartFetch {
    type: typeof FETCH_INGREDIENTS
}

interface IFailedFetch {
    type: typeof FETCH_INGREDIENTS_FAILED,
    error: string
}

interface ISetCurrentTab {
    type: typeof SWITCH_TAB
    current: string | undefined
}

interface ISetIngredients {
    type: typeof FETCH_INGREDIENTS_SUCCESS,
    data: IIngredient[]

}

export type TBurgerConstructor = IStartFetch | IFailedFetch | ISetIngredients | ISetCurrentTab;



// Детальная информация об ингредиенте
interface IDetailedIngredientInfo {
    type: typeof GET_DETAILED_INGREDIENT_INFO,
    info: IIngredient
}

interface IClearDetailedInfo {
    type: typeof CLEAR_DETAILED_INGREDIENT_INFO
}

export type TDetailedInfo = IDetailedIngredientInfo | IClearDetailedInfo


// Типы обработки отправки заказа
interface IOrderSent {
    type: typeof ORDER_SENT
}

interface IOrderSuccess {
    type: typeof ORDER_SENT_SUCCESS,
    orderInfo: any,
    orderNumber: number
}

interface IOrderSentFailed {
    type: typeof ORDER_SENT_FAILED
}

interface IOrderSentFinished {
    type: typeof ORDER_PROCESSING_FINISHED
}

interface IClearOrderNumber {
    type: typeof CLEAR_ORDER_NUMBER
}

export type TOrderProcessing = IOrderSent | IOrderSuccess | IOrderSentFailed | IOrderSentFinished | IClearOrderNumber;


// Типизация операций с личным кабинетом и логином
interface IFinishAuth {
    type: typeof AUTH_STATUS_CHECKED
}
interface IClearUser {
    type: typeof CLEAR_USER
}

interface IBlockButton {
    type: typeof SEND_EMAIL_START
}

interface IUnBlockButton {
    type: typeof SEND_EMAIL_FINISHED
}

interface ISetUser {
    type: typeof SET_USER,
    data: {
        email: string,
        name: string
    }
}

export type TUser = IFinishAuth | IClearUser | IBlockButton | IUnBlockButton | ISetUser