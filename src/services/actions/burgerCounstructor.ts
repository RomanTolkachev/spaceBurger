
import uuid from "react-uuid";
import {IIngredient, TConstructorActionType} from "../../utils/types";
export const HANDLE_DROP:'HANDLE_DROP' = 'HANDLE_DROP';
export const HANDLE_DELETE:'HANDLE_DELETE' = 'HANDLE_DELETE';
export const HANDLE_SWAP_CARD:'HANDLE_SWAP_CARD' = 'HANDLE_SWAP_CARD';
export const HANDLE_CLEAR_CART:'HANDLE_CLEAR_CART' = 'HANDLE_CLEAR_CART';

export function handleDrop(item: IIngredient): TConstructorActionType {
    const dynamicId: string = uuid();
    return {
        type: HANDLE_DROP,
        droppableItem: {
            ...item,
            dynamicId,
        }
    }
}

export function handleDelete(itemDynamicId: string): TConstructorActionType {
    return {
        type: HANDLE_DELETE,
        deletableItemId: itemDynamicId
    };
}

export function handleSwap(dragIndex: number, hoverIndex: number): TConstructorActionType {
    return {
        type: HANDLE_SWAP_CARD,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    };
}

export function handleClearCart(): TConstructorActionType {
    return {
        type: HANDLE_CLEAR_CART,
    }

}
