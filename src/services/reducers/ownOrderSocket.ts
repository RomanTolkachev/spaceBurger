import {
    WS_OWN_ORDERS_CONNECTION_START,
    WS_OWN_ORDERS_CONNECTION_SUCCESS,
    WS_OWN_ORDERS_CONNECTION_ERROR,
    WS_OWN_ORDERS_SEND_MESSAGE,
    WS_OWN_ORDERS_GET_MESSAGE,
    WS_OWN_ORDERS_CONNECTION_CLOSED
} from "../actions/ownOrdersSocket";


interface IStartConnection {
    type: typeof WS_OWN_ORDERS_CONNECTION_START
}

interface IConnectionSuccess {
    type: typeof WS_OWN_ORDERS_CONNECTION_SUCCESS
}

interface IConnectionFailed {
    type: typeof WS_OWN_ORDERS_CONNECTION_ERROR
}

interface ISendMessage {
    type: typeof WS_OWN_ORDERS_SEND_MESSAGE
}

interface IGetMessage {
    type: typeof WS_OWN_ORDERS_GET_MESSAGE
    payload: any
}

interface ICloseConnection {
    type: typeof WS_OWN_ORDERS_CONNECTION_CLOSED
}

export type TFeedAction = ICloseConnection | IGetMessage | ISendMessage | IConnectionFailed | IConnectionSuccess | IStartConnection

export interface IOrder {
    createdAt: string,
    ingredients: Array<string>,
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

export interface ISocket {
    isLoading: boolean,
    ordersArray: null | IOrder[],
    total?: null | number,
    totalToday?: null | number
    error?: any
}

const initialState = {
    isLoading: false,
    ordersArray: null,
    error: "i am state of personalOrderReduces",
    total: null,
    totalToday: null,
}

export const personalOrdersReducer = (state: ISocket = initialState, action: TFeedAction): ISocket => {
    switch (action.type) {
        case WS_OWN_ORDERS_CONNECTION_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case WS_OWN_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case WS_OWN_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action
            }
        }
        case WS_OWN_ORDERS_SEND_MESSAGE: {
            return {
                ...state,
            }
        }
        case WS_OWN_ORDERS_GET_MESSAGE: {
            return {
                ...state,
                ordersArray: JSON.parse(action.payload).orders,
                total: JSON.parse(action.payload).total,
                totalToday: JSON.parse(action.payload).totalToday
            }
        }
        case WS_OWN_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
            }
        }
        default: {
            return state
        }
    }
}