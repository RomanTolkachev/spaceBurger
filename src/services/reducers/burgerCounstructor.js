
import {HANDLE_DROP, HANDLE_DELETE} from "../actions/burgerCounstructor";


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
        default:
            {
                return state
            }

    }
}