import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { rootReducer } from "./services/reducers/root-reducer";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from 'react-router-dom'


const composeEnhancers =
    typeof window === 'object' // @ts-ignore
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // @ts-ignore
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// @ts-ignore
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
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
