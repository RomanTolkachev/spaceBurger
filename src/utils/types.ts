import {HANDLE_CLEAR_CART, HANDLE_DELETE, HANDLE_DROP, HANDLE_SWAP_CARD} from "../services/actions/burgerCounstructor";

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