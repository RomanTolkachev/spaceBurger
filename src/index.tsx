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
import {WSFeedConnected, WSFeedError, WSFeedClose, WSFeedGetMessage, WSFeedStart} from "./services/actions/socket";



const socketEventHandlers = {
    connect: WSFeedStart,
    disconnect: WSFeedClose,
    connected: WSFeedConnected,
    opened: null,
    gotError: WSFeedError,
    gotMessage: WSFeedGetMessage,
    sendMessage: null
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).prepend(
            unionSocketMiddleware(socketEventHandlers)
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
