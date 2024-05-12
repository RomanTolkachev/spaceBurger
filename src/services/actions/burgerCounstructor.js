import uuid from "react-uuid";
export const HANDLE_DROP = 'HANDLE_DROP';
export const HANDLE_DELETE = 'HANDLE_DELETE';

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