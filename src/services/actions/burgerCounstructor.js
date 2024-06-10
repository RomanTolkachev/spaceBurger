
import uuid from "react-uuid";
export const HANDLE_DROP = 'HANDLE_DROP';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const HANDLE_SWAP_CARD = 'HANDLE_SWAP_CARD';
export const HANDLE_CLEAR_CART = 'HANDLE_CLEAR_CART';


export function handleDrop(item) {
    return function(dispatch) {
        const dynamicId = uuid();
        dispatch({
            type: HANDLE_DROP,
            droppableItem: {
                ...item,
                dynamicId,
            }
        })
    }
}

export function handleDelete(itemDynamicId) {
    return function(dispatch) {
        dispatch({
            type: HANDLE_DELETE,
            deletableItemId: itemDynamicId
        })
    }
}

export function handleSwap(dragIndex, hoverIndex) {
    return function(dispatch) {
        dispatch({
            type: HANDLE_SWAP_CARD,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }
}

export function handleClearCart() {
    return function(dispatch) {
        dispatch({
            type: HANDLE_CLEAR_CART,
        })
    }
}
