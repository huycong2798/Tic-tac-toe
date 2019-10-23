import React from "react";
import ReactDOM from "react-dom";
import {createStore, compose, applyMiddleware} from "redux";
import ThunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {Provider} from "react-redux";
import allReducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const loggerMidderware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(ThunkMiddleware, loggerMidderware))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
