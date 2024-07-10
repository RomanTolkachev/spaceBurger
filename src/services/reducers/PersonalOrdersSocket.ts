import {
    WS_PERSONAL_ORDERS_CONNECTION_START,
    WS_PERSONAL_ORDERS_CONNECTION_SUCCESS,
    WS_PERSONAL_ORDERS_CONNECTION_ERROR,
    WS_PERSONAL_ORDERS_SEND_MESSAGE,
    WS_PERSONAL_ORDERS_GET_MESSAGE,
    WS_PERSONAL_ORDERS_CONNECTION_CLOSED, WS_PERSONAL_ORDERS_START_DISCONNECT
} from "../actions/PersonalOrdersSocket";


interface IStartConnection {
    type: typeof WS_PERSONAL_ORDERS_CONNECTION_START
}

interface IConnectionSuccess {
    type: typeof WS_PERSONAL_ORDERS_CONNECTION_SUCCESS
}

interface IConnectionFailed {
    type: typeof WS_PERSONAL_ORDERS_CONNECTION_ERROR
}

interface IStartDisconnect {
    type: typeof WS_PERSONAL_ORDERS_START_DISCONNECT
}

interface ISendMessage {
    type: typeof WS_PERSONAL_ORDERS_SEND_MESSAGE
}

interface IGetMessage {
    type: typeof WS_PERSONAL_ORDERS_GET_MESSAGE
    payload: any
}

interface ICloseConnection {
    type: typeof WS_PERSONAL_ORDERS_CONNECTION_CLOSED
}

export type TFeedAction = ICloseConnection | IGetMessage | ISendMessage | IConnectionFailed | IConnectionSuccess | IStartConnection | IStartDisconnect

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
    ordersArray: null | IOrder[],
    total?: null | number,
    totalToday?: null | number
    error?: any
}

const initialState = {
    ordersArray: null,
    error: "i am state of personalOrderReduces",
    total: null,
    totalToday: null,
}

export const personalOrdersReducer = (state: ISocket = initialState, action: TFeedAction): ISocket => {
    switch (action.type) {
        case WS_PERSONAL_ORDERS_CONNECTION_START: {
            return {
                ...state,
            }
        }
        case WS_PERSONAL_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
            }
        }
        case WS_PERSONAL_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action
            }
        }
        case WS_PERSONAL_ORDERS_SEND_MESSAGE: {
            return {
                ...state,
            }
        }
        case WS_PERSONAL_ORDERS_GET_MESSAGE: {
            let parsedPayload: IOrder[] = action.payload.orders;
            parsedPayload = parsedPayload.sort((a: IOrder, b: IOrder) =>  +new Date(b.createdAt) - +new Date(a.createdAt))
            return {
                ...state,
                ordersArray: parsedPayload,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        case WS_PERSONAL_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
            }
        }
        default: {
            return state
        }
    }
}