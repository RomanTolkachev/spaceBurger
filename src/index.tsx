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


export const store = configureStore({
    reducer: rootReducer,
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
