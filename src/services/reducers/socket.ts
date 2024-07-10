import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_SEND_MESSAGE, WS_GET_MESSAGE, WS_CONNECTION_CLOSED} from "../actions/socket";

export interface IStartConnection {
    type: typeof WS_CONNECTION_START
    payload: string
}

interface IConnectionSuccess {
    type: typeof WS_CONNECTION_SUCCESS
}

interface IConnectionFailed {
    type: typeof WS_CONNECTION_ERROR
}

interface ISendMessage {
    type: typeof WS_SEND_MESSAGE
    payload: string
}

interface IGetMessage {
    type: typeof WS_GET_MESSAGE
    payload: any
}

interface ICloseConnection {
    type: typeof WS_CONNECTION_CLOSED
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
    ordersArray: null | IOrder[],
    total?: null | number,
    totalToday?: null | number
    error?: any
}

const initialState = {
    ordersArray: null,
    error: "i am state of feed",
    total: null,
    totalToday: null,
}

export const feedTableReducer = (state: ISocket = initialState, action: TFeedAction): ISocket => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action
            }
        }
        case WS_SEND_MESSAGE: {
            return {
                ...state,
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                ordersArray: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
            }
        }
        default: {
            return state
        }
    }
}