import {Middleware, MiddlewareAPI} from "redux";
import {TAppActions as AppActions, TAppDispatch as AppDispatch} from "../../utils/types";
import {IRootState as RootState} from "../reducers/root-reducer";
import {
    WS_PERSONAL_ORDERS_CONNECTION_START

} from "../actions/PersonalOrdersSocket";
import {refreshToken} from "../../utils/api";

const wsPersonalSocketURL: 'wss://norma.nomoreparties.space/orders' = 'wss://norma.nomoreparties.space/orders'

export const personalOrdersSocketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_OWN_ORDERS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(`${wsPersonalSocketURL}?token=${localStorage.getItem("accessToken")}`);
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

                socket.onmessage = event => {
                    const { data } = event;
                    if (JSON.parse(data).message === "Invalid or missing token") {
                         return refreshToken().then(res => {
                         localStorage.setItem('accessToken', res.accessToken.replace('Bearer ', ""))
                        }).then(() => dispatch({type: WS_PERSONAL_ORDERS_CONNECTION_START}))
                    }
                    dispatch({ type: 'WS_OWN_ORDERS_GET_MESSAGE', payload: data });
                };
                        // const error = new Error(JSON.parse(data).message)
                        // dispatch({type: WS_OWN_ORDERS_CONNECTION_ERROR, error: error.message})
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