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
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {personalOrdersSocketMiddleware} from "./services/middleware/PersomanOrdersSocketMiddleware";
const socketURL: 'wss://norma.nomoreparties.space/orders/all' = 'wss://norma.nomoreparties.space/orders/all'


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).prepend(
            socketMiddleware(socketURL),
            personalOrdersSocketMiddleware()
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
