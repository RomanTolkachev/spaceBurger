import {HANDLE_CLEAR_CART} from "./burgerCounstructor";


export const ORDER_SENT = 'ORDER_SENT';
export const ORDER_SENT_SUCCESS = 'ORDER_SENT_SUCCESS';
export const ORDER_SENT_FAILED = 'ORDER_SENT_FAILED';
export const ORDER_PROCESSING_FINISHED = 'ORDER_PROCESSING_FINISHED';
export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';




export function sendOrder(url, arrayOfIds) {
    return function (dispatch) {
        dispatch({
            type: ORDER_SENT
        })
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: arrayOfIds})
    })
        .then(res => {
            if (res.ok) {
                 return res.json()
            }
        })
        .then(parsed => {
            if (parsed.success) {
                dispatch({
                    type: ORDER_SENT_SUCCESS,
                    orderInfo: parsed,
                    orderNumber: parsed.order.number
                })
            } else {
                dispatch({
                    type: ORDER_SENT_FAILED,
                })
            }
        })
        .catch(() => {
            console.log('404')
            dispatch({
                type: ORDER_SENT_FAILED,
            })
        })
        .finally(() =>
            dispatch({
                type: ORDER_PROCESSING_FINISHED,
            })
        )
    }
}