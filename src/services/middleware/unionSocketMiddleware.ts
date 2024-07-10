import {Middleware, MiddlewareAPI} from "redux";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../actions/socket";
import {TFeedAction} from "../reducers/socket";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";


export type socketActionTypes = {

}

export type TWSHandlersTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    sendMessage?: ActionCreatorWithPayload<any> | null,
    connected: ActionCreatorWithoutPayload,
    opened?: ActionCreatorWithoutPayload | null,
    gotError: ActionCreatorWithPayload<string>,
    gotMessage: ActionCreatorWithPayload<any>
}


export const unionSocketMiddleware = (eventHandlers: TWSHandlersTypes): Middleware => {
    return ((store) => {

        let socket: WebSocket | null = null;
        const {dispatch} = store;

        const {
            connect,
            disconnect,
            sendMessage,
            connected,
            gotError,
            gotMessage
        } = eventHandlers

        return (next) => (action: TFeedAction) => {
            if (connect.match(action)) {
                socket = new WebSocket(action.payload)
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(connected())
                }
                socket.onclose = () => {
                    dispatch(disconnect())
                }
                socket.onmessage = event => {
                    const { data } = event;
                    try {
                        const parsedData = JSON.parse(data);
                        dispatch(gotMessage(parsedData))
                    } catch (e) {
                        dispatch(gotError((e as any).message))
                    }
                };
                socket.onerror = () => {
                    dispatch(gotError('Error'));
                };

                if (sendMessage?.match(action)) {
                    try {
                        const message: any = action.payload;
                        socket.send(JSON.stringify(message));
                    } catch (e) {
                        dispatch(gotError((e as any).message))
                    }
                }
                if (disconnect.match(action)) {
                    socket.close()
                    socket = null
                }
            }
            return next(action)
        }
    }) as Middleware;
};
