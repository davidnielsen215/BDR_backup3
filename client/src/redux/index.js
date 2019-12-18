import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import subscriptions from "./subscription";
import auth from "./auth";

const reducer = combineReducers({
    subscriptions,
    auth
});

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);