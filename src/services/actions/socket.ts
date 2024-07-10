import {createAction} from "@reduxjs/toolkit";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_START_DISCONNECT: "WS_START_DISCONNECT" = 'WS_START_DISCONNECT'
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = 'WS_SEND_MESSAGE'


export const WSFeedStart = createAction<string>(WS_CONNECTION_START)
export const WSFeedClose = createAction(WS_CONNECTION_CLOSED)
export const WSFeedConnected = createAction(WS_CONNECTION_SUCCESS)
export const WSSendMessage = createAction<any>(WS_SEND_MESSAGE) // не нужен
export const WSFeedError = createAction<any>(WS_CONNECTION_ERROR)
export const WSFeedGetMessage = createAction<any>(WS_GET_MESSAGE)
export const WSStartDisconnect = createAction(WS_START_DISCONNECT)
