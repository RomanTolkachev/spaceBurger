
import {HANDLE_DROP, HANDLE_DELETE, HANDLE_CLEAR_CART, HANDLE_SWAP_CARD} from "../actions/burgerCounstructor";


const initialState = {
    bun: [],
    filling: [],
};

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_DROP: {
            if (action.droppableItem.type !== 'bun') {
                return {
                    ...state,
                    filling: [...state.filling, action.droppableItem]
                }
            } else {
                if (state.bun.length === 0) {
                    return {
                        ...state,
                        bun: [action.droppableItem, action.droppableItem]
                    }
                } else if (state.bun[0]._id === action.droppableItem._id) {
                    return {
                        ...state
                    }
                } else {
                    return {
                        ...state,
                        bun: [action.droppableItem, action.droppableItem]
                    }
                }
            }
        }
        case HANDLE_DELETE: {
            return {
                ...state,
                filling: state.filling.filter(item => item.dynamicId !== action.deletableItemId)
            }
        }
        case HANDLE_SWAP_CARD: {
            const newCards = [...state.filling];
            newCards.splice(action.dragIndex, 1);
            newCards.splice(action.hoverIndex, 0, state.filling[action.dragIndex]);
            console.log(`тащим: ${action.dragIndex}   принимаем: ${action.hoverIndex}`)
            return {
                ...state,
                filling: [...newCards]
            }
        }
        case HANDLE_CLEAR_CART: {
            return {
                ...initialState
            }
        }
        default:
            {
                return state
            }
    }
}