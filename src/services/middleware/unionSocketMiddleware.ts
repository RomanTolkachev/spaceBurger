import {Middleware} from "redux";
import {TFeedAction} from "../reducers/socket";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {refreshToken} from "../../utils/api";

export type TWSHandlersTypes = {
    connect: ActionCreatorWithPayload<string>,
    startDisconnect: ActionCreatorWithoutPayload
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
            startDisconnect,
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
                    socket = null
                }
                socket.onmessage = event => {
                    const { data } = event;
                    try {
                        const parsedData = JSON.parse(data);
                        if (data.message === "Invalid or missing token") { // проверка что токен не протух
                            return refreshToken()
                            .then(res => {
                                localStorage.setItem('accessToken', res.accessToken.replace('Bearer ', ""))
                            })
                            .then(() => dispatch(connect(`${socket!.url}?token=${localStorage.getItem("accessToken")}`)))
                        }
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
                if (startDisconnect.match(action)) {
                    socket.close()
                    console.log(socket.readyState)
                }
            }
            return next(action)
        }
    }) as Middleware;
};
