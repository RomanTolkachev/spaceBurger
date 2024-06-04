import {ORDER_SENT, ORDER_SENT_SUCCESS, ORDER_SENT_FAILED, ORDER_PROCESSING_FINISHED, CLEAR_ORDER_NUMBER} from "../actions/order";

const initialState = {
    isOrderButtonLocked: false,
    isOrderSuccess: null,
    orders: [],
    modalContent: null,
}

export const orderStore = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_SENT: {
            return {
                ...state,
                isOrderButtonLocked: true,
                isOrderSuccess: null
            }
        }
        case ORDER_SENT_SUCCESS: {
            return {
                ...state,
                isOrderSuccess: true,
                orders: [...state.orders, action.orderInfo],
                modalContent: action.orderNumber
            }
        }
        case ORDER_SENT_FAILED: {
            return {
                ...state,
                isOrderSuccess: false
            }
        }
        case ORDER_PROCESSING_FINISHED: {
            return {
                ...state,
                isOrderButtonLocked: false,
            }
        }
        case CLEAR_ORDER_NUMBER: {
            return initialState
        }
        default: {
            return state
        }
    }
}