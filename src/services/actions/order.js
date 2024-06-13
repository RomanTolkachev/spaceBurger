
export const ORDER_SENT = 'ORDER_SENT';
export const ORDER_SENT_SUCCESS = 'ORDER_SENT_SUCCESS';
export const ORDER_SENT_FAILED = 'ORDER_SENT_FAILED';
export const ORDER_PROCESSING_FINISHED = 'ORDER_PROCESSING_FINISHED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export const startSendOrder = () => {
    return {
        type: ORDER_SENT
    }
}

export const handleOrderSuccess = (parsed) => {
    return {
        type: ORDER_SENT_SUCCESS,
        orderInfo: parsed,
        orderNumber: parsed.order.number
    }
}

export const orderSentFiled = () => {
    return {
        type: ORDER_SENT_FAILED,
    }
}

export const orderSentFinished = () => {
    return {
        type: ORDER_PROCESSING_FINISHED
    }
}

export function clearOrderNumber() {
    return {
        type: CLEAR_ORDER_NUMBER
    }
}