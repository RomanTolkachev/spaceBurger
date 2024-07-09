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


export type socketActionTypes = {

}


export const unionSocketMiddleware = (): Middleware => {
    return ((store) => {
        let socket: WebSocket | null = null;
        const {dispatch} = store;

        return (next) => (action: TFeedAction) => {
            if (action.type === WS_CONNECTION_START) {
                socket = new WebSocket(action.payload)
                console.log(action)
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({type: WS_CONNECTION_SUCCESS})
                }
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: WS_GET_MESSAGE, payload: data });
                };
                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                };

                if (action.type === WS_SEND_MESSAGE) {
                    const message = action.payload;
                    socket.send(JSON.stringify(message));
                }
                if (action.type === WS_CONNECTION_CLOSED) {
                    socket.close()
                }
            }
            return next(action)
        }
    }) as Middleware;
};

// const connect = () => {
//
// }
// const disconnect = () => {
//
// }
// const connecting = () => {
//
// }
// const senMessage = () => {
//
// }
// const onOpen = () => {
//
// }
// const onError = () => {
//
// }
// const onMessage = () => {
//
// }