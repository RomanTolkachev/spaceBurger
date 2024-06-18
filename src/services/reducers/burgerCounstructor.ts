
import {HANDLE_DROP, HANDLE_DELETE, HANDLE_CLEAR_CART, HANDLE_SWAP_CARD} from "../actions/burgerCounstructor";
import {IConstructorIngredient, TConstructorActionType} from "../../utils/types";

export interface IBurgerConstructorStore {
    bun: IConstructorIngredient[] | [],
    filling: IConstructorIngredient[] | [],
    [key: string]: IConstructorIngredient[] | []; // это костыль, чтобы можно было сделать итерацию для подсчета стоимости корзины
}

const initialState: IBurgerConstructorStore = {
    bun: [],
    filling: [],
};

export const burgerConstructor = (state: IBurgerConstructorStore = initialState, action: TConstructorActionType ):IBurgerConstructorStore => {
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