import {AppThunk, TNavigate, TOrderProcessing} from "../../utils/types";
import {sendOrderRequest} from "../../utils/api";
import {handleClearCart} from "./burgerCounstructor";
import {WSSendMessage} from "./socket";

export const ORDER_SENT: 'ORDER_SENT' = 'ORDER_SENT';
export const ORDER_SENT_SUCCESS: 'ORDER_SENT_SUCCESS' = 'ORDER_SENT_SUCCESS';
export const ORDER_SENT_FAILED: 'ORDER_SENT_FAILED' = 'ORDER_SENT_FAILED';
export const ORDER_PROCESSING_FINISHED: 'ORDER_PROCESSING_FINISHED' = 'ORDER_PROCESSING_FINISHED';
export const CLEAR_ORDER_NUMBER: 'CLEAR_ORDER_NUMBER' = 'CLEAR_ORDER_NUMBER';


interface IOrderResponse {
    order: {number: number},
    name: string,
    success: boolean
}

export const startSendOrder = (): TOrderProcessing => {
    return {
        type: ORDER_SENT
    }
}

export const handleOrderSuccess = (parsed: IOrderResponse): TOrderProcessing => {
    return {
        type: ORDER_SENT_SUCCESS,
        orderInfo: parsed,
        orderNumber: parsed.order.number
    }
}

export const orderSentFailed = (): TOrderProcessing => {
    return {
        type: ORDER_SENT_FAILED,
    }
}

export const orderSentFinished = (): TOrderProcessing => {
    return {
        type: ORDER_PROCESSING_FINISHED
    }
}

export function clearOrderNumber(): TOrderProcessing {
    return {
        type: CLEAR_ORDER_NUMBER
    }
}

export const takeMyOrder = (user: string | null, navigate: TNavigate, ids: string[]): AppThunk => {
    return dispatch => {
        if (!user) {
            return navigate('/login')
        } else {
            // dispatch(WSSendMessage(ids))
            dispatch(startSendOrder());
            sendOrderRequest(ids)
                .then(res => {
                    if (res.success) {
                        dispatch(handleOrderSuccess(res));
                        dispatch(handleClearCart())
                    } else alert('заказ не создан')
                })
                .catch(() => orderSentFailed())
                .finally(() => dispatch(orderSentFinished()))
        }
    }
}

