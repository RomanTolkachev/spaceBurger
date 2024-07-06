import {Middleware, MiddlewareAPI} from "redux";
import {TAppActions as AppActions, TAppDispatch as AppDispatch} from "../../utils/types";
import {IRootState as RootState} from "../reducers/root-reducer";

const wsPersonalSocketURL: 'wss://norma.nomoreparties.space/orders' = 'wss://norma.nomoreparties.space/orders'
let accessToken: string | null = localStorage.getItem("accessToken");

export const personalOrdersSocketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_OWN_ORDERS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(`${wsPersonalSocketURL}?token=${accessToken}`);
            }
            if (socket) {
            if (type === 'WS_OWN_ORDERS_CONNECTION_CLOSED') {
                // объект класса WebSocket
                socket.close()
            }

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({ type: 'WS_OWN_ORDERS_CONNECTION_SUCCESS', payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({ type: 'WS_OWN_ORDERS_CONNECTION_ERROR', payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    if (data.message === "Invalid or missing token") {
                        console.log(data.message)
                    }
                    dispatch({ type: 'WS_OWN_ORDERS_GET_MESSAGE', payload: data });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: 'WS_OWN_ORDERS_CONNECTION_CLOSED', payload: event });
                };

                if (type === 'WS_OWN_ORDERS_SEND_MESSAGE') {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};