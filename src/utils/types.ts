import {HANDLE_CLEAR_CART, HANDLE_DELETE, HANDLE_DROP, HANDLE_SWAP_CARD} from "../services/actions/burgerCounstructor";
import {
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
    FETCH_INGREDIENTS_SUCCESS, SWITCH_TAB
} from "../services/actions/burgerIngredients";

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
interface IStartFetch {
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

export type TBurgerConstructor = IStartFetch | IFailedFetch | ISetIngredients | ISetCurrentTab