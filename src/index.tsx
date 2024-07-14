import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {rootReducer} from "./services/reducers/root-reducer";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from 'react-router-dom'
import {configureStore} from "@reduxjs/toolkit";
import {unionSocketMiddleware} from "./services/middleware/unionSocketMiddleware";
import {
    WSFeedConnected,
    WSFeedError,
    WSFeedClose,
    WSFeedGetMessage,
    WSFeedStart,
    WSStartDisconnect
} from "./services/actions/socket";
import {
    WSPersonalOrdersFeedClose,
    WSPersonalOrdersFeedConnected, WSPersonalOrdersFeedGetMessage,
    WSPersonalOrdersFeedStart, WSPersonalOrdersStartDisconnect
} from "./services/actions/PersonalOrdersSocket";



const socketEventHandlers = {
    connect: WSFeedStart,
    startDisconnect: WSStartDisconnect,
    disconnect: WSFeedClose,
    connected: WSFeedConnected,
    opened: null,
    gotError: WSFeedError,
    gotMessage: WSFeedGetMessage,
    sendMessage: null
}

const personalOrdersEventHandlers = {
    connect: WSPersonalOrdersFeedStart,
    startDisconnect: WSPersonalOrdersStartDisconnect,
    disconnect: WSPersonalOrdersFeedClose,
    connected: WSPersonalOrdersFeedConnected,
    opened: null,
    gotError: WSFeedError,
    gotMessage: WSPersonalOrdersFeedGetMessage,
    sendMessage: null
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).prepend(
            unionSocketMiddleware(socketEventHandlers), unionSocketMiddleware(personalOrdersEventHandlers)
        ),
});

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <App/>
                </DndProvider>
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>
);
