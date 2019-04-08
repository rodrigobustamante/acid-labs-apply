import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { weather } from "../components/map/api/state";

// Root Reducer
const rootReducer = combineReducers({
  weather
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
