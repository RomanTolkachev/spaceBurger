import {TOrderProcessing} from "../../utils/types";

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

export const orderSentFiled = (): TOrderProcessing => {
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